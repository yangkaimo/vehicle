export const history = {
    // 得到传感器类型有哪些
    getTypeArr(typeArr,res){
        for (let i = 0; i < res.length; i++) {
          if(typeArr.indexOf(res[i].type) === -1){
            typeArr.push(res[i].type)
          }
        }
        return typeArr
    },
    // 得到每种传感器对应哪些id
    getIdOfType(that,typeArr,res,idOfType){
        let idArr = []
        for (let i = 0; i < typeArr.length; i++) {
          for (let j = 0; j < res.length; j++) {
            if(typeArr[i] === res[j].type){
              idArr.push(res[j].sensor_id)
            }
          }
          // 得到每种传感器对应的id数组之后，以key-value形式存入idOfType
          that.$set(idOfType,typeArr[i],idArr)
          // 清空idArr用于下次循环
          idArr = []
        }
        return idOfType
    },
    // 根据选择的传感器，匹配对应的id数组
    typeSelected(typeArr,type_selected,idArrUesd,idOfType){
        // this.id_selected = ''
        for(const k in typeArr){
          if(type_selected === typeArr[k]){
            idArrUesd = idOfType[type_selected]
          }
        }
        return idArrUesd
    },
}