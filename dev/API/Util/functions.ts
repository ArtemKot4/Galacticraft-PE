
const sec = (time) => (World.getThreadTime() % time) * 20 === 0;

//excludes functions of js

const ObjectValues = function<T>(obj: {}): T[] { 
  return Object.keys(obj).map(function(v) { 
  return obj[v] 
  }) 
 };
 /**
  * ObjectAssign -> реализация недостающего метода Object.assign
  * @include объект для дополнения
  * @objs объекты для слияния
  * @возвращает include 
  */
 function ObjectAssign (include: {}, ...objs: {}[]){ 
   for(const a in objs){
  let ik = Object.keys(objs[a])
  const kk = ObjectValues(objs[a]) 
  for(const i in ik){ 
  for(const k in kk) { 
  include[ik[i]] = kk[i] 
  } 
  } }
  return include 
 };


 
const MathHelper = {
  randomValue: function<T> (...values): T {
    const random = values[Math.floor(Math.random() * values.length)];
    return random;
  },
  radian(gradus: int): int {
    return (gradus * Math.PI) / 180;
  },
};
