import React, {useState, useEffect} from 'react'

const Checkbox = ({categories, handleFilters}) => {
const [checked, setChecked] = useState([])

const handleToggle = c => () =>{
    const currentCategoryId = checked.indexOf(c) //return first index of else -1
    const newcheckedCateoryId = [...checked]

    if(currentCategoryId == -1){
        newcheckedCateoryId.push(c);
    }
    else{
        newcheckedCateoryId.splice(currentCategoryId,1)
    }

    //console.log(newcheckedCateoryId)
    setChecked(newcheckedCateoryId)
    handleFilters(newcheckedCateoryId)
}

    return categories.map((c, i)=>(
        <li key={i} className="list-unstyled">
          <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{c.name}</label>   
       </li>
    ))
}
export default Checkbox;