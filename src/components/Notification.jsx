import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";

import styles from "./Notification.module.css";

import { Fragment } from "react";

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
    icon: HiBellAlert,
  },
  {
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
    icon: HiBellAlert,
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
    icon: HiBellAlert,
  },
];

function Notification() {
  return (
    <>
      <Popover className={styles.popover}>
        <Popover.Button className={styles.popoverBtn}>
          <div className={styles.notificationIconContainer}>
            <IoIosNotificationsOutline
              className={styles.notificationIcon}
              size={18}
            />
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
                {solutions.map((item) => (
                  <div
                    key={item.name}
                    href={item.href}
                    className={styles.panelItem}
                  >
                    <div className={styles.iconContainer}>
                      <item.icon
                        aria-hidden="true"
                        className={styles.alertIcon}
                      />
                    </div>
                    <div className={styles.detailsContainer}>
                      <p className={styles.name}>{item.name}</p>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="bg-gray-50 p-4">
                <a
                  href="##"
                  className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                >
                  <span className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Documentation
                    </span>
                  </span>
                  <span className="block text-sm text-gray-500">
                    Start integrating products and tools
                  </span>
                </a>
              </div> */}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}

export default Notification;
