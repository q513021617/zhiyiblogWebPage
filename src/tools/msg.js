export function makeToast(self,variant = null,title) {
    let successtag=[{name:'success',des:'成功'},{name:'fail',des:'失败'},{name:'warning',des:'警告'}].filter((item)=>{return item.name===variant});
   //  debugger
    successtag=successtag[0].des;
    self.$bvToast.toast(title+""+successtag, {
       title: "提示",
       variant: variant,
       solid: true
     })
   }