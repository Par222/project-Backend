const createDoctor=(list,doc)=>{
    list.push(doc)
    return list
}
const deleteDoctor=(list,id)=>{
   list.splice(list.findIndex((doc)=>doc.id==id),1)
    return list
}
const getAmbByPatientId=(list,id,patient)=>{
    
    list[list.findIndex((amb)=>amb.id==id)].status="Alloted"
    list[list.findIndex((amb)=>amb.id==id)].patient=patient;
   
}
const updateAppByPatientId=(list,id,status)=>{
    
    list[list.findIndex((app)=>app.patient==id)].status=status
   
   
}
exports.createDoctor=createDoctor
exports.deleteDoctor=deleteDoctor
exports.getAmbByPatientId=getAmbByPatientId
exports.updateAppByPatientId=updateAppByPatientId