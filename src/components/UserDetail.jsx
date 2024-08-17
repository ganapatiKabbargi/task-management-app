import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import styles from "./UserDetail.module.css";

import { Fragment } from "react";

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
    icon: HiBellAlert,
  },
];

import { BGS, getNameFirstLetter } from "../utils";
function UserDetail({ user }) {
  return (
    <>
      <Popover className={styles.popover}>
        <Popover.Button className={styles.popoverBtn}>
          <div className={styles.notificationIconContainer}>
            {getNameFirstLetter(user.name)}
          </div>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel>
            <div className={styles.panelContainer}>
              <div className={styles.panel}>
                <div className={styles.name}>
                  <div
                    className={styles.team}
                    style={{
                      backgroundColor: `${BGS[Math.floor(Math.random() * 4)]}`,
                    }}
                  >
                    {getNameFirstLetter(user.name)}
                  </div>
                  <div>{user.name}</div>
                </div>
                <div className={styles.role}>{user.title}</div>
                <div className={styles.email}>{user.email}</div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}

export default UserDetail;
