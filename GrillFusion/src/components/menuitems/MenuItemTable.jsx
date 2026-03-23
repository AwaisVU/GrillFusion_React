import React from 'react'
import { BASE_API_URL } from '../../utility/constants'

export default function({menuitems, isLoading, error, handleDeleteMenuItem, onEdit}) {
if(isLoading){
    return(
        <div className='text-center py-4'>
        <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className="pt-3">Menu Items Are Loading</p>
    </div>
    )
}

if(error){
    return(
    <div className="alert alert-danger">
    <h4>Error In Loading Items</h4>
    <p>An error occurred while loading menu items.</p>
    </div>
    )
}

if(!menuitems?.length){
    return(
  <div className="text-center py-5">
  <i className="bi bi-basket text-muted" style={{ fontSize: "3rem" }}></i>
  <h4 className="mt-3 text-muted">No Menu Items</h4>
  <p className="text-muted">Start by adding your first menu item.</p>
  </div>
    )
}

return(
    <>
    <div className="table-responsive">
  <table className="table table-hover">
    <thead className="table-dark">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Description</th>
        <th>Price</th>
        <th>Special Tag</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {menuitems.map((item) => (
        <tr key={item.id}>
        <td>
          <img
            src={`${BASE_API_URL}/${item.image}`}
            className="rounded"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            onError={(e)=>{e.target.src="https://placehold.co/600x400"}}
          />
        </td>
        <td>
          <strong>{item.name}</strong>
          <br />
        </td>
        <td>
          <span className="badge bg-secondary">{item.category}</span>
        </td>
        <td>
          <span className="badge bg-secondary">{item.description}</span>
        </td>
        <td>
          <strong>${item.price}</strong>
        </td>
        <td>
          <span className="badge bg-warning">{item.specialTag}</span>
        </td>
        <td>
          <div className="btn-group" role="group">
            <button className="btn btn-sm btn-outline-success" title="Edit" onClick={()=>onEdit(item)}>
              <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={()=>handleDeleteMenuItem(item)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
        ))}
      
    </tbody>
  </table>
</div>

    </>
)
}
