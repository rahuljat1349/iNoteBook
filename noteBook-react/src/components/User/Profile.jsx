import { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Profile() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <div className="text-white">This is Your Profile niggah</div>;
}
