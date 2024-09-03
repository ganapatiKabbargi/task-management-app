import React, { useEffect } from "react";
import styles from "./UpdateProfile.module.css";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { setUserCredentials } from "../store/authSlice";

function UpdateProfile({ setOpen }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const defaultData = {
    "display name": user["display name"] || "",
    "profile picture": user["profile picture"] || "",
    "phone number": user["phone number"] || "",
    email: user?.email || "",
    gender: user.gender || "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: defaultData });

  function submitHandler(data) {
    updateProfile(auth.currentUser, {
      displayName: data["display name"],
      photoURL: data["profile picture"],
      phoneNumber: data["phone number"],
      email: data.email,
    })
      .then(() => {
        toast.success("Profile Updated Successfully...");
      })
      .catch((error) => {
        toast.error("Profile Updated failed...", error.message);
      });

    dispatch(
      setUserCredentials({
        ...user,
        "phone number": data["phone number"],
        gender: data.gender,
      })
    );
    setOpen(false);
  }

  return (
    <>
      <Modal setOpen={setOpen} />
      <section className={styles.container}>
        <header>Update Profile</header>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.input_box}>
            <label>Full Name</label>
            <input
              required=""
              placeholder="Enter full name"
              type="text"
              {...register("display name")}
            />
          </div>
          <div className={styles.input_box}>
            <label>Email</label>
            <input
              required=""
              placeholder="Enter Email"
              type="email"
              {...register("email")}
            />
          </div>
          <div className={styles.column}>
            <div className={styles.input_box}>
              <label>Phone Number</label>
              <input
                required=""
                placeholder="Enter phone number"
                type="telephone"
                {...register("phone number")}
              />
            </div>
          </div>
          <div className={styles.gender_box}>
            <label>Gender</label>
            <div className={styles.gender_option}>
              <div className={styles.gender}>
                <input
                  name="gender"
                  id="check-male"
                  type="radio"
                  value={"Male"}
                  {...register("gender")}
                />
                <label htmlFor="check-male">Male</label>
              </div>
              <div className={styles.gender}>
                <input
                  name="gender"
                  id="check-female"
                  type="radio"
                  value={"Female"}
                  {...register("gender")}
                />
                <label htmlFor="check-female">Female</label>
              </div>
              <div className={styles.gender}>
                <input
                  name="gender"
                  id="check-other"
                  type="radio"
                  value={"Prefer not to say"}
                  {...register("gender")}
                />
                <label htmlFor="check-other">Prefer not to say</label>
              </div>
            </div>
          </div>
          <div className={`${styles.input_box} ${styles.address}`}>
            <label> Profile Picture</label>
            <input
              required=""
              placeholder="Enter street address"
              type="text"
              {...register("profile picture")}
            />
          </div>
          <button>Submit</button>
        </form>
      </section>
    </>
  );
}

export default UpdateProfile;
