import { useNavigate } from "react-router-dom";

const Tabs = () => {
  const navigate = useNavigate();

  return (
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={()=>{
            navigate("quanlinguoidung")
        }}>Quản lí người dùng</a>
        <a className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick={()=>{
            navigate("quanlikhoahoc")
        }}>Quản lí khóa học</a>
        <a className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
        <a className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
      </div>
  )
}

export default Tabs