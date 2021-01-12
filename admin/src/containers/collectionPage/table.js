import React, {useEffect, useState} from 'react'
import ReactStars from 'react-rating-stars-component'
import { connect } from "react-redux"
import OrdinaryModal from "./ordinaryModal"
import {updateTableItems} from "../../actionCreator"
import {searchTableItem, filterAndSortTableItems} from "./services"
import ChatBoxModal from "../../components/chatBoxModal"

const UserBody = ({pageItems}) => {
    const [optionType, setOptionType] = useState('detail')
    const [currentItem,setCurrentItem] = useState({
        _id: "",
        authenticateMethod: {
            local: {
                email: ""
            }
        }
    })
    const [modalShow, setModalShow] = useState(false)
    const [chatModalShow, setChatModalShow] = useState(false)
    const [recieverID, setRecieverID] = useState(null)
    return (
        <>
        <table className="table table-bordered dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
            <thead>
                <tr role="row">
                    <th tabIndex="0" aria-controls="dataTable">Photo</th>
                    <th tabIndex="0" aria-controls="dataTable">Fullname</th>
                    <th tabIndex="0" aria-controls="dataTable">Role</th>
                    <th tabIndex="0" aria-controls="dataTable">Email</th>
                    <th tabIndex="0" aria-controls="dataTable"></th>
                </tr>
            </thead>
            <tbody>
            {  
                pageItems.map(value => {
                    return (
                        <tr key={value._id} role= "row">
                            <td>
                                <img src={value.photoUser ? value.photoUser : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKFSgdhQvBlZO6I8s-jtKIYOED1NqEs4xEjA&usqp=CAU"} width='100' height='100'></img>
                            </td>
                            <td>{value.fullName}</td>
                            <td>{value.role}</td>
                            <td>{value.authenticateMethod.local.email}</td> 
                            <td className="d-flex justify-content-between mb-1">
                                <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('detail') }} className="btn btn-info col-md-2"> 
                                    <span className="icon d-flex justify-content-center">
                                        <i className="fas fa-info"></i>
                                    </span>
                                </button>
                                <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('update')}} className="btn btn-primary col-md-2">
                                    <span className="icon d-flex justify-content-center">
                                        <i className="fas fa-pen"></i>
                                    </span>
                                </button>
                                <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('delete')}} className="btn btn-danger col-md-2"> 
                                    <span className="icon d-flex justify-content-center">
                                        <i className="fas fa-trash"></i>
                                    </span>
                                </button>
                                <button onClick={() => { setChatModalShow(true); setRecieverID(value._id) }} className="btn btn-success col-md-2">
                                    <span className="icon d-flex justify-content-center">
                                        <i className="fas fa-inbox"></i>
                                    </span>
                                </button>
                            </td>
                        </tr>                      
                    )
                })
            }
            </tbody>
        </table>
        <OrdinaryModal collection='user' optionType={optionType} item={currentItem} show={modalShow} onHide={() => setModalShow(false)}/>
        <ChatBoxModal show={chatModalShow} onHide={() => setChatModalShow(false)} recieverID={recieverID}/>
        </>
    )
}

const CourseBody = ({pageItems}) => {
    const [optionType, setOptionType] = useState('detail')
    const [currentItem,setCurrentItem] = useState({})
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
        <table className="table table-bordered dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info">
            <thead>
                <tr role="row">
                    <th tabIndex="0" aria-controls="dataTable">Photo</th>
                    <th tabIndex="0" aria-controls="dataTable">Course Name</th>
                    <th tabIndex="0" aria-controls="dataTable">Category</th>
                    <th tabIndex="0" aria-controls="dataTable">Rating</th>
                    <th tabIndex="0" aria-controls="dataTable"></th>
                </tr>
            </thead>
            <tbody>
                {  
                    pageItems.map(value => {
                        return(
                            <tr key={value._id} role= "row">
                                <td>
                                    <img src={value.pictures[0]} alt="Picture" width='150' height='100'></img>
                                </td>
                                <td>{value.name}</td>
                                <td>{value.category}</td>
                                <td>
                                    <ReactStars 
                                        count={5} 
                                        value={Number(value.rating)}
                                        edit = {false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        size={25}
                                    />
                                </td>
                                <td className="d-flex justify-content-between">
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('detail') }} className="btn btn-info col-md-3"> 
                                        <span className="icon d-flex justify-content-center">
                                            <i className="fas fa-info"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('update')}} className="btn btn-primary col-md-3">
                                        <span className="icon d-flex justify-content-center">
                                            <i className="fas fa-pen"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('delete')}} className="btn btn-danger col-md-3"> 
                                        <span className="icon d-flex justify-content-center">
                                            <i className="fas fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <OrdinaryModal collection='course' optionType={optionType} item={currentItem} show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

const TransBody = ({pageItems}) => {
    const [optionType, setOptionType] = useState('detail')
    const [currentItem,setCurrentItem] = useState({})
    const [modalShow, setModalShow] = useState(false)
    return (
        <>
        <table className="table table-bordered dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" style={{width: '100%'}}>
            <thead>
                <tr role="row">
                    <th tabIndex="0" aria-controls="dataTable">Transactions ID</th>
                    <th tabIndex="0" aria-controls="dataTable">Status</th>
                    <th tabIndex="0" aria-controls="dataTable">Rating</th>
                    <th tabIndex="0" aria-controls="dataTable">Date</th>
                    <th tabIndex="0" aria-controls="dataTable"></th>
                </tr>
            </thead>
            <tbody>
                {  
                    pageItems.map(value => {
                        return(
                            <tr key={value._id} role= "row">
                                <td>{value._id}</td>
                                <td>{value.status}</td>
                                <td>
                                    <ReactStars 
                                        count={5} 
                                        value={Number(value.rating)}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        size={23}
                                    />
                                </td>
                                <td>
                                    <input  className="form-control" type="date" 
                                            defaultValue= {value.date}/>
                                </td>
                                <td className="d-flex justify-content-between">
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('detail') }} className="btn btn-info col-md-3"> 
                                        <span className="icon d-flex justify-content-center">
                                            <i className="fas fa-info"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('update')}} className="btn btn-primary col-md-3 ml-1 mr-1">
                                        <span className="icon d-flex justify-content-center">
                                            <i className="fas fa-pen"></i>
                                        </span>
                                    </button>
                                    <button onClick={() => {setCurrentItem(value); setModalShow(true); setOptionType('delete')}} className="btn btn-danger col-md-3"> 
                                        <span className="icon d-flex justify-content-center">
                                            <i className="fas fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <OrdinaryModal collection='trans' optionType={optionType} item={currentItem} show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

const Table = ({state, filter, updateTableItems}) => {
    useEffect(() => {
        updateTableItems(filterAndSortTableItems(state, filter))
    }, [state.sort, filter])

    useEffect(() => {
        updateTableItems(searchTableItem(state, filter))
    }, [filter.search])

    switch(state.collection) {
        case 'user':
            return (
                <UserBody pageItems={state.tableItems.slice((state.page-1)*state.entries, (state.page)*state.entries)}/>
            )
        case 'course':
            return (
                <CourseBody pageItems={state.tableItems.slice((state.page-1)*state.entries, (state.page)*state.entries)}/>
            )
        case 'trans':
            return (
                <TransBody pageItems={state.tableItems.slice((state.page-1)*state.entries, (state.page)*state.entries)}/>
            )
        default: 
            return(<></>)
    } 
}

const mapStateToProps = state => ({state: state.table, filter: state.filter})

const mapDispatchToProps = dispatch => {
    return {
      updateTableItems: (tableItems) => dispatch(updateTableItems(tableItems)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Table)