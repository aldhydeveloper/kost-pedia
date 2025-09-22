"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import KostLink from "@/components/Utility/Link";
import Button from "@/components/Utility/CustomButton";
import { NumericFormat } from "react-number-format";
// import Product from "@/components/Property/kost/ListKost";
import Get from "@/service/get";
import Delete from "@/service/delete";
import Card from "@/components/Card";
import { ToastContainer, toast } from "react-toastify";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FaChevronDown } from "react-icons/fa6";
import useStore from "./form/component/store";
import { Modal } from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';
import "react-accessible-accordion/dist/fancy-example.css";
import "react-toastify/dist/ReactToastify.css";

interface iRooms {
  id: string;
  name: string;
  price: number;
  size: string;
}
interface iProduct {
  id: string;
  name: string;
  category: string;
  address: string;
  front_image: string;
  status: number;
  rooms: iRooms[];
}
// const getData = async () => {

// }
const Kost = () => {
  // console.log(Product());
  const [listKost, setListKost] = useState<iProduct[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const id = useRef<string>('');

  const deleteKost = async () => {
    setDisabled(true)
    const resp = await Delete(`${process.env.NEXT_PUBLIC_API_HOST}/kost/${id.current}`);
    // console.log(resp)
    if(resp.success)
        toast.success(<span className="text-nowrap">{resp.success}</span>, {
            position: "top-center",
            className: "w-96",
        });
    else
      toast.error(<span className="text-nowrap">{resp.error}</span>, {
          position: "top-center",
          className: "w-96",
      });

    setOpenModal(false);
    setDisabled(false)
    getData();
  }

  const getData = async () => {
    const products = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/kost`);
    if (products.success) {
      setListKost(products.data);
    }

  }
  
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    // setListKost()
  }
  
  const filteredKost = listKost?.filter((kost) =>
    kost.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      // console.log(products);
      
      getData();
      dispatch({
        type: "SET_INITIAL"
      });
    };
    
    
    fetchData();
  }, [dispatch]);
  return (
    <>
    <ToastContainer />
    <Modal open={openModal} onClose={() => {setOpenModal(false)}}  center>
      <div className="mt-8 mb-3">
        <p className="pb-6">Apakah kamu yakin akan menghapus data kost ini?</p>
        <div className="flex items-center justify-between gap-10">
          <Button className="py-2 h-[41.5px]" onClick={deleteKost} isLoading={disabled} disabled={disabled}>Hapus</Button>
          <Button className="py-2 !bg-danger !border-danger" onClick={() => setOpenModal(false)}>Batal</Button>
        </div>
      </div>
    </Modal>
      <div className="flex justify-between items-center mb-8">
        <div>
          
        <h1 className="text-xl font-bold">Daftar Kost</h1>
        <small>Informasi kost selalu up-to-date. bikin penyewa lebih mudah menemukan Anda.</small>
        </div>
        <div className="flex gap-7">
          <input type="text" className="min-w-70 block w-full py-3 px-4 rounded-lg text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search ..." />
          <KostLink href="/property/kost/form" className="bg-meta-5 rounded-lg flex-shrink-0 text-sm py-3">Tambah Kost</KostLink>
        </div>
      </div>
      <Accordion allowMultipleExpanded allowZeroExpanded className="border-0">
        <div className="inline-grid grid-cols-3 gap-4 items-start">
          {filteredKost &&
            filteredKost.map((value, index) => {
              return (
                <Card key={index} customClass="py-3 min-h-48">
                  <div className="grid grid-cols-4 h-32">
                    <div className="col-span-3 pr-2">
                      <div className="flex gap-4 items-center mb-3">
                        <h5 className="text-sm text-azure-700">
                          {value.category}
                        </h5>
                        <label
                          className={`block text-center rounded-full px-5 py-1 text-xs text-white ${
                            value.status == 1
                              ? "bg-meta-5"
                              : "bg-bodydark"
                          }`}
                        >
                          {value.status == 1 ? "Aktif" : "Non Aktif"}
                        </label>
                      </div>
                      <h3 className="text-base font-bold mb-2">{value.name}</h3>
                      <p className="text-xs leading-4">{value.address}</p>
                    </div>
                    <div className="overflow-hidden h-20">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/images${value.front_image}`}
                        className="object-cover object-center max-w-[unset] h-full w-full"
                        alt="thumbnail"
                        width={200}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4 gap-5">
                    <button onClick={() => {setOpenModal(true); id.current = value.id}} type="button" className="text-sm w-full border-danger border py-2 px-8 font-semibold rounded-md text-danger">
                      Hapus Kost
                    </button>
                    <Link
                      href={`/property/kost/form/${value.id}`}
                      role="link"
                      className="text-sm text-center text-meta-5 border border-meta-5 py-2 px-8 font-semibold rounded-md w-full"
                    >
                      Ubah Kost
                    </Link>
                  </div>
                  <AccordionItem key={value.id}>
                    <AccordionItemHeading className="mb-2">
                      <AccordionItemButton className="flex justify-between items-center text-azure ">
                        <span>Detail Kamar</span>
                        <FaChevronDown />
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="p0 accordion__panel !p-0">
                      {value.rooms &&
                        value.rooms.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between"
                          >
                            <div className="wrap py-1">
                              <p className="text-sm font-bold">{v.name}</p>
                              <NumericFormat
                                value={v.price}
                                displayType="text"
                                prefix="Harga : Rp. "
                                thousandSeparator="."
                                decimalSeparator=","
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Button
                                role="link"
                                className="text-sm float-right"
                                href={`/property/room/${v.id}`}
                              >
                                Ubah Kamar
                              </Button>
                            </div>
                          </div>
                        ))}
                    </AccordionItemPanel>
                  </AccordionItem>
                </Card>
              );
            })}
        </div>
      </Accordion>
      {/* <Product /> */}
    </>
  );
};

export default Kost;
