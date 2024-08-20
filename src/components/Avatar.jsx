import React from "react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import styles from "./Avatar.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../store/authSlice";
function Avatar() {
  const dispatch = useDispatch();
  function signOutHandler() {
    signOut(auth)
      .then(() => {
        dispatch(setUserCredentials(null));
      })
      .catch((error) => {
        // An error happened.
      });
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
            <div style={{ padding: "10px" }}>
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
                  <button className={styles.menuItem_btn}>
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
