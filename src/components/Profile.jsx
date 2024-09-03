import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import UpdateProfile from "./UpdateProfile";
import { IoMdFemale, IoMdMale } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setUserCredentials } from "../store/authSlice";

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const docRef = doc(db, "users", user.id);
  useEffect(() => {
    async function fetchUserDetail() {
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let data = docSnap.data();
          dispatch(setUserCredentials(data));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchUserDetail();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.logo}>User Profile</div>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Search..." />
            </div>
            <div className={styles.avatar}>
              <div className={styles.userAvatar}>
                <img
                  src={
                    user["profile picture"] ||
                    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt="profile image"
                  className={styles.avatarImage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.greetcontainer}>
          <div className={styles.greet}>
            <span>{`Hello ${user["display name"] || "User"}`}</span>
          </div>
          <div className={styles.description}>
            <p>
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
          <div className={styles.edit_profile}>
            <button
              className={styles.edit_profile_btn}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className={styles.user_detail_container}>
          <div className={styles.user_info}>
            <div className={styles.heading}>
              <div className={styles.my_account}>
                <p>My Account</p>
              </div>
              <div>
                <button className={styles.settings}>Settings</button>
              </div>
            </div>
            <div className={styles.user_info_container}>
              <p className={styles.user_information}>user information</p>
              <div className={styles.user_information_container}>
                <div className={styles.user_name_container}>
                  <p>user Name</p>
                  <div className={styles.username}>
                    <span>{user["display name"] || "User Name"}</span>
                  </div>
                </div>
                <div className={styles.user_name_container}>
                  <p>user Email</p>
                  <div className={styles.username}>
                    <span>{user?.email || "User Email"}</span>
                  </div>
                </div>
                <div>
                  <p>Phone Number</p>
                  <div className={styles.username}>
                    <span>{user["phone number"] || "Phone Number"}</span>
                  </div>
                </div>
                <div>
                  <p>Gender</p>
                  <div className={styles.username}>
                    <span>{user.gender || "Gender"}</span>
                  </div>
                </div>
                <div>
                  <p>Photo Url</p>
                  <div className={styles.username}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "230px",
                        height: "22px",
                        overflow: "hidden",
                      }}
                    >
                      {user["profile picture"] || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileImg}>
              <img
                src={
                  user["profile picture"] ||
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt="profile image"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.taskInfo}>
              <div className={styles.task}>
                <span className={styles.task_count}>6</span>
                <span className={styles.task_title}>Total Tasks</span>
              </div>
              <div className={styles.task}>
                <span className={styles.task_count}>4</span>
                <span className={styles.task_title}>Completed</span>
              </div>
              <div className={styles.task}>
                <span className={styles.task_count}>2</span>
                <span className={styles.task_title}>In Progress</span>
              </div>
            </div>

            <div className={styles.profile_name_container}>
              <span className={styles.profile_name}>
                {user["display name"]}
                {user.gender === "Male" ? (
                  <IoMdMale color="blue" />
                ) : (
                  <IoMdFemale color="pink" />
                )}
              </span>

              <span className={styles.adress}> Address</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <UpdateProfile setOpen={setIsOpen} />}
    </>
  );
}

export default Profile;
