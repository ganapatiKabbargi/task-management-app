import React from "react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import styles from "./TaskDialog.module.css";
import { BsThreeDots } from "react-icons/bs";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MdAdd, MdDelete, MdOutlineEdit } from "react-icons/md";
import { HiDuplicate } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";
function TaskDialog() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const duplicateHandler = () => {};

  const deleteClicksHandler = () => {};

  const items = [
    {
      label: "Open Task",
      icon: <AiTwotoneFolderOpen className={styles.icon} aria-hidden="true" />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: "Edit Task",
      icon: <MdOutlineEdit className={styles.icon} aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: "Add Sub-Task",
      icon: <MdAdd className={styles.icon} aria-hidden="true" />,
      onClick: () => setOpen(true),
    },
    {
      label: "Duplicate",
      icon: <HiDuplicate className={styles.icon} aria-hidden="true" />,
      onClick: () => duplicateHandler(),
    },
  ];
  return (
    <>
      <Menu as="div" className={styles.menu}>
        <Menu.Button className={styles.menu_button}>
          <span>{<BsThreeDots />}</span>
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
              {items.map((item, i) => {
                return (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={styles.menuItem_btn}
                        onClick={item.onClick}
                        key={i}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={styles.menuItem_btn}
                    onClick={deleteClicksHandler}
                    style={{ color: "#f22" }}
                  >
                    {
                      <MdDelete
                        className={styles.icon}
                        style={{ color: "#f22" }}
                        aria-hidden="true"
                      />
                    }
                    {"Delete Task"}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {openEdit && <AddTask setOpen={setOpenEdit} />}
    </>
  );
}

export default TaskDialog;
