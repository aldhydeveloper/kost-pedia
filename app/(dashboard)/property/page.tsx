"use client";

import { NumericFormat } from "react-number-format";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import ProductList from "@/service/product/list";
import DataTable from "react-data-table-component";
import Link from "@/components/Utility/Link";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";
import Spinner from "@/components/spinner";

import Get from "@/service/get";
import Delete from "@/service/delete";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type tFacility = {
  id: string;
  name: string;
};
type tRow = {
  id: string;
  name: string;
  price: string;
  facilities: tFacility[];
  desc: string;
  status: boolean;
};

const Property = () => {
  // const status = useRef<number>(1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [list, setList] = useState([]);
  const getData = () => {
    const products = ProductList();
    products.then((resp) => {
      setList(resp.data);
    });
  };

  const setActive = (e: any) => {
    // console.log(e.currentTarget.dataset.status);
    const id = e.currentTarget.id;
    const status = e.currentTarget.dataset.status == "true" ? 0 : 1;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg p-8">
            <label className="text-xl font-bold text-black block mb-4">
              Active/Inactive
            </label>
            <p>Are you sure want to Active/Inactive this room</p>

            <div className="flex justify-between gap-4 pt-6">
              <button
                type="button"
                className="bg-danger rounded-md py-2 max-w-16 w-full text-white"
                onClick={onClose}
              >
                No
              </button>
              <button
                onClick={(e) => {
                  e.currentTarget.disabled = true;
                  // setDisabled(true);
                  // async () => {
                  Get(
                    `${process.env.NEXT_PUBLIC_API_HOST}/room/status/${id}/${status}`
                  ).then((res) => {
                    getData();
                    onClose();
                    if (res?.success) {
                      toast.success(
                        <span className="text-nowrap">{res.success}</span>,
                        {
                          position: "top-center",
                          className: "w-96",
                        }
                      );
                    } else {
                      toast.error(
                        <span className="text-nowrap">{res?.error}</span>,
                        {
                          position: "top-center",
                          className: "w-96",
                        }
                      );
                    }
                    // setDisabled(false);
                  });
                  // };
                }}
                type="button"
                className="bg-azure-700 rounded-md py-2 max-w-16 w-full text-white"
                disabled={disabled}
              >
                {!disabled ? "Yes" : <Spinner />}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const setDelete = (e: any) => {
    // console.log(e.currentTarget.dataset.status);
    // const id = e.currentTarget.id;
    const id = e.currentTarget.dataset.id;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg p-8">
            <label className="text-xl font-bold text-black block mb-4">
              Delete Room
            </label>
            <p>Are you sure want to Delete this room</p>

            <div className="flex justify-between gap-4 pt-6">
              <button
                type="button"
                className="bg-danger rounded-md py-2 max-w-16 w-full text-white"
                onClick={onClose}
              >
                No
              </button>
              <button
                onClick={(e) => {
                  e.currentTarget.disabled = true;
                  // setDisabled(true);
                  // async () => {
                  Delete(`${process.env.NEXT_PUBLIC_API_HOST}/room/${id}`).then(
                    (res) => {
                      getData();
                      onClose();
                      if (res?.success) {
                        toast.success(
                          <span className="text-nowrap">{res.success}</span>,
                          {
                            position: "top-center",
                            className: "w-96",
                          }
                        );
                      } else {
                        toast.error(
                          <span className="text-nowrap">{res?.error}</span>,
                          {
                            position: "top-center",
                            className: "w-96",
                          }
                        );
                      }
                      // setDisabled(false);
                    }
                  );
                  // };
                }}
                type="button"
                className="bg-azure-700 rounded-md py-2 max-w-16 w-full text-white"
                disabled={disabled}
              >
                {!disabled ? "Yes" : <Spinner />}
              </button>
            </div>
          </div>
        );
      },
    });
  };
  const columns = [
    {
      name: "Name",
      cell: (row: tRow) => (
        <Link
          href={`/property/form?id=${row.id}`}
          role="link"
          className="text-md btn-link"
        >
          {row.name}
        </Link>
      ),
    },
    {
      name: "Price",
      cell: (row: tRow) => (
        <NumericFormat
          displayType="text"
          prefix="Rp. "
          thousandSeparator="."
          decimalSeparator=","
          value={row.price}
        />
      ),
    },
    {
      name: "Facilities",
      selector: (row: tRow) => {
        const facilities = row.facilities.map((v, i) => {
          return v.name;
        });
        return facilities.join(", ");
      },
    },
    {
      name: "Description",
      selector: (row: tRow) => row.desc,
    },
    {
      name: "Action",
      cell: (row: tRow) => {
        return (
          <div className="flex items-center gap-4">
            <button
              id={row.id}
              data-status={row.status}
              type="button"
              className={`rounded-md px-3 py-2 text-white ${
                row.status ? "bg-azure-700" : "bg-danger"
              }`}
              onClick={setActive}
            >
              {row.status ? <FaCheck /> : <FaTimes />}
            </button>
            <button
              data-id={row.id}
              type="button"
              className="rounded-sm px-3 py-2 bg-danger text-white"
              onClick={setDelete}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];
  // console.log("render");
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ToastContainer />
      <Link href="/property/form">Tambah Product</Link>
      <div className="my-4">
        <DataTable columns={columns} data={list}></DataTable>
      </div>
    </>
  );
};

export default Property;
