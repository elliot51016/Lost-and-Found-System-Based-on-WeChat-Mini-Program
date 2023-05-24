<template>
  <div class="body">
    <div class="top">
      <h2>用户管理</h2>
      <el-input
        placeholder="请输入用户名"
        prefix-icon="el-icon-search"
        v-model="search"
        @input = "toSearch"
      >
      </el-input>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="openid" label="OpenID"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="data" label="注册时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="确认删除此数据？不可恢复！"
            @confirm="deleteItem(scope.row._id)"
          >
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { debounce } from 'lodash';
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      search:""
    };
  },
  async created() {
    this.getTableDate();
  },
  methods: {
    async getTableDate(search) {
      let params = {}
      if(search){
        params = {
          search,
        page: this.page,
        size: this.size,
      };
      }else{ 
        params = {
        page: this.page,
        size: this.size,
      };}
     
      const {
        data: { result, total },
      } = await this.$http.post("/admin/getUser", params);

      this.tableData = result.map((item) => {
        return {
          ...item,
          data: this.$dayjs(item.date).format("YYYY-MM-DD HH:mm:ss"),
        };
      }).reverse();
      this.total = total;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableDate();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableDate();
    },
    async deleteItem(_id) {
      const params = {
        _id,
      };

      const { data } = await this.$http.post("/admin/deleteUser", params);
      if (data === "success") {
        this.$message.success("删除成功");
        this.getTableDate();
        console.log("??");
      } else {
        this.$message.success("删除失败");
      }
    },
    toSearch(e){
      let _toSearch = debounce(()=> this.getTableDate(this.search),800)
      //  this.getTableDate(this.search)
      _toSearch();
    }
  },
};
</script>

<style lang="less" scoped>
.body {
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  .top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    
    .el-input{
      width: 300px;
     
    }
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
 
}
</style>