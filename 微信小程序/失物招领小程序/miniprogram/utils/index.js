export const  formatTime = (time) =>{
  const _time = new Date(time);
  const y =_time.getFullYear();
  const m =_time.getMonth()+1;
  const d =_time.getDate();
  const h =_time.getHours();
  const _m =_time.getMinutes();
  const s =_time.getSeconds();

  return `${y}-${m}-${d} ${h}:${_m}:${s}`;
} 

export const ajax = (url,method,data)=>{
  const base_url = `http://localhost:3000${url}`
  return new Promise ((resolve,reject)=>{
    wx.request({
      url: `${base_url}`,
      method:method ? method  : 'GET',
      data,
      success :(res)=>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}