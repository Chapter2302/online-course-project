import React, {useState, useEffect} from "react"
import {connect} from "react-redux"
import { getAll } from "../api"
import { logout } from "../actionCreator"
import ChatBoxModal from "./chatBoxModal"
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const socket = socketIOClient(ENDPOINT);

const MessagesDropdownItem = (props) => {
    const { senderID, senderName, content, senderPhoto } = props.messageItem
    const setModalShow = props.setModalShow
    const setRecieverID = props.setRecieverID 

    return(
        <a className="dropdown-item d-flex align-items-center" href="#" 
            onClick={
                ()=>{
                    setModalShow(true); 
                    setRecieverID(senderID)
                }
            }
        >
            <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src={senderPhoto ? senderPhoto : "https://source.unsplash.com/fn_BT9fwg_E/60x60"} alt=""/>
                <div className="status-indicator bg-success"></div>
            </div>
            <div className="font-weight-bold">
                <div className="text-truncate">{content}</div>
                <div className="small text-gray-500">{senderName}</div>
            </div>
        </a>
    )
}

const TopBar = ({logout}) => {
    const [modalShow, setModalShow] = useState(false)
    const [recieverID, setRecieverID] = useState(null)
    const [messageDropdownItems, setMessageDropdownItems] = useState([])
    const user = JSON.parse(localStorage.getItem("session"))

    useEffect(() => {
        socket.emit('joinRoom', { userID: user.id, recieverID: null })
        socket.on("message", data => {
            console.log('recieve: ', data)
            const newMessageItem = {
                senderID: data.senderID,
                senderName: data.senderName,
                content: data.message,
                senderPhoto: data.senderPhoto
            }
            let isExist = false
            const newList = messageDropdownItems.map(item => {
                if(item.senderID === data.senderID) {
                    isExist = true
                    return newMessageItem
                } else {
                    return item
                }
            })

            if(!isExist) {
                newList.push(newMessageItem)
            }

            setMessageDropdownItems(newList)
        });
    }, [])

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
              </button>
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                      <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                      <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                          </button>
                      </div>
                  </div>
              </form>
          <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow d-sm-none">
                  <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-search fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                          <div className="input-group">
                              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                              <div className="input-group-append">
                                  <button className="btn btn-primary" type="button">
                                      <i className="fas fa-search fa-sm"></i>
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </li>

              <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-bell fa-fw"></i>
                      <span className="badge badge-danger badge-counter">3+</span>
                  </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
              <h6 className="dropdown-header">
                Alerts Center
              </h6>
              <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                  <div className="icon-circle bg-primary">
                  <i className="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div className="small text-gray-500">December 12, 2019</div>
                  <span className="font-weight-bold">A new monthly report is ready to download!</span>
              </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                  <div className="icon-circle bg-success">
                  <i className="fas fa-donate text-white"></i>
                  </div>
              </div>
              <div>
                  <div className="small text-gray-500">December 7, 2019</div>
                  $290.29 has been deposited into your account!
              </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                  <div className="icon-circle bg-warning">
                  <i className="fas fa-exclamation-triangle text-white"></i>
                  </div>
              </div>
              <div>
                  <div className="small text-gray-500">December 2, 2019</div>
                  Spending Alert: We've noticed unusually high spending for your account.
              </div>
              </a>
              <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
          </div>
          </li>

          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-envelope fa-fw"></i>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                    Message Center
                </h6>
                {
                    (() => {
                        return messageDropdownItems.map(item => {
                            return <MessagesDropdownItem key={item.recieverID} messageItem={item} setModalShow={setModalShow} setRecieverID={setRecieverID}/>
                        })
                    })()
                }
                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.fullName}</span>
              <img className="img-profile rounded-circle" src={user.photoUser != "" ? user.photoUser : "https://source.unsplash.com/Mv9hjnEUHR4/60x60"}/>
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
                </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </a>
            </div>
          </li>
        </ul>
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button 
                            onClick={() => logout()} 
                            className="btn btn-primary" 
                            data-dismiss="modal"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <ChatBoxModal show={modalShow} onHide={() => setModalShow(false)} recieverID={recieverID}/>
    </nav>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(logout())
    }
}
  
export default connect(null, mapDispatchToProps)(TopBar)