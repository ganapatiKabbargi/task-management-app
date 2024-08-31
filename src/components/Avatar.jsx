import React from "react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { CgMoveTask } from "react-icons/cg";
import { Menu, Transition } from "@headlessui/react";
import styles from "./Avatar.module.css";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../store/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Avatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOutHandler() {
    signOut(auth)
      .then(() => {
        dispatch(setUserCredentials(null));
        toast.info("Signed Out Successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      })
      .catch((error) => {
        // An error happened.
      });
  }

  async function passwordChangeHandler() {
    const email = prompt("Enter email");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Email Sent! Check your inbox for password reset instruction.",
        { position: "top-center", autoClose: false }
      );
    } catch (error) {
      toast.error("Could'nt reset password properly! try again", {
        autoclose: 2000,
        position: "top-center",
      });
    }
  }

  return (
    <>
      <Menu as="div" className={styles.menu}>
        <Menu.Button className={styles.menu_button}>
          <span>R</span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={styles.menu_items}>
            <div className={styles.account}>
              <span>Account</span>
            </div>
            <div style={{ padding: "10px 0px" }}>
              <Menu.Item>
                {({ active }) => (
                  <button className={styles.menuItem_btn}>
                    <MdUpdate
                      style={{ marginRight: "8px" }}
                      area-hidden="true"
                    />
                    Updates
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={styles.menuItem_btn}>
                    <MdOutlineMessage
                      style={{ marginRight: "8px" }}
                      area-hidden="true"
                    />
                    Messages
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={styles.menuItem_btn}
                    onClick={() => {
                      navigate("/tasks");
                    }}
                  >
                    <CgMoveTask
                      style={{ marginRight: "8px" }}
                      area-hidden="true"
                    />
                    Tasks
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className={styles.settings}>
              <span>Settings</span>
            </div>
            <div style={{ padding: "10px 0px" }}>
              <Menu.Item>
                {({ active }) => (
                  <button className={styles.menuItem_btn}>
                    <FaUser style={{ marginRight: "8px" }} area-hidden="true" />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={styles.menuItem_btn}
                    onClick={passwordChangeHandler}
                  >
                    <FaUserLock
                      style={{ marginRight: "8px" }}
                      area-hidden="true"
                    />
                    Change Password
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={styles.menuItem_btn}
                    style={{ color: "#d22" }}
                    onClick={signOutHandler}
                  >
                    <IoLogOutOutline
                      style={{ marginRight: "8px", color: "#d22" }}
                      area-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default Avatar;
