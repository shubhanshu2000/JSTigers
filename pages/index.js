import Head from "next/head";
import { useState, useEffect } from "react";

export async function getStaticProps(context) {
  let res = await fetch("http://localhost:3000/api/form", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await res.json();
  return {
    props: { result },
  };
}

export default function Home({ result }) {
  const [d, setD] = useState([]);
  const [vendor_name, setVendor_name] = useState("");
  const [bank_account_number, setBank_account_number] = useState("");
  const [bank_name, setBank_name] = useState("");
  const [address_line_1, setAddress_line_1] = useState("");
  const [address_line_2, setAddress_line_2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      vendor_name: event.target.vendor_name.value,
      bank_account_number: event.target.bank_account_number.value,
      bank_name: event.target.bank_name.value,
      address_line_1: event.target.address_line_1.value,
      address_line_2: event.target.address_line_2.value,
      city: event.target.city.value,
      country: event.target.country.value,
      zipcode: event.target.zipcode.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/form";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
  };

  const updateData = async (id) => {
    let data;
    if (
      (
        vendor_name ||
        bank_account_number ||
        bank_name ||
        address_line_1 ||
        address_line_2 ||
        city ||
        country ||
        zipcode
      ).length === 0
    ) {
      return console.log("Update Something");
    } else {
      data = {
        id,
        vendor_name,
        bank_account_number,
        bank_name,
        address_line_1,
        address_line_2,
        city,
        country,
        zipcode,
      };
    }
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/form";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
  };
  const deleteData = async (id) => {
    const data = {
      id,
      vendor_name,
      bank_account_number,
      bank_name,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/form";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
  };
  console.log(vendor_name, "vendorname");
  useEffect(() => {
    setD(result.data);
  }, [result]);
  return (
    <div className="app">
      <Head>
        <title>JSTigers</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="vendor_name">Vendor Name*</label>
          <input type="text" id="vendor_name" name="vendor_name" required />
          <label htmlFor="bank_account_number">Bank Account Number*</label>
          <input
            type="number"
            id="bank_account_number"
            name="bank_account_number"
            required
          />
          <label htmlFor="bank_name">Bank Name*</label>
          <input type="text" id="bank_name" name="bank_name" required />
          <label htmlFor="address_line_1">Address Line 1</label>
          <input type="text" id="address_line_1" name="address_line_1" />
          <label htmlFor="address_line_2">Address Line 2</label>
          <input type="text" id="address_line_2" name="address_line_2" />
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" />
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" />
          <label htmlFor="zipcode">Zip Code: </label>
          <input type="number" id="zipcode" name="zipcode" />
          <button type="submit">Submit</button>
        </form>
        <ul>
          <li>Names:</li>
          {d?.map((d, i) => {
            return (
              <>
                <li key={i}>
                  Vendor Name:{" "}
                  <span
                    contentEditable="true"
                    // defaultValue={d.vendor_name}
                    onKeyUp={(e) =>
                      setVendor_name(
                        e.target.textContent === ""
                          ? d.vendor_name
                          : e.target.textContent
                      )
                    }
                    suppressContentEditableWarning="true"
                  >
                    {d.vendor_name}
                  </span>
                </li>
                <li>
                  Bank account number:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={
                      (e) => setBank_account_number(e.target.textContent)
                      // setBank_account_number(d.b)
                    }
                    suppressContentEditableWarning="true"
                  >
                    {d.bank_account_number}
                  </span>
                </li>
                <li>
                  Bank Name:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={(e) => setBank_name(e.target.textContent)}
                    suppressContentEditableWarning="true"
                  >
                    {d.bank_name}
                  </span>
                </li>
                <li>
                  Address Line 1:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={(e) => setAddress_line_1(e.target.textContent)}
                    suppressContentEditableWarning="true"
                  >
                    {d.address_line_1}
                  </span>
                </li>
                <li>
                  Address Line 2:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={(e) => setAddress_line_2(e.target.textContent)}
                    suppressContentEditableWarning="true"
                  >
                    {d.address_line_2}
                  </span>
                </li>
                <li>
                  City:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={(e) => setCity(e.target.textContent)}
                    suppressContentEditableWarning="true"
                  >
                    {d.city}
                  </span>
                </li>
                <li>
                  Country:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={(e) => setCountry(e.target.textContent)}
                    suppressContentEditableWarning="true"
                  >
                    {d.country}
                  </span>
                </li>
                <li>
                  Zip code:{" "}
                  <span
                    contentEditable="true"
                    onKeyUp={(e) => setZipcode(e.target.textContent)}
                    suppressContentEditableWarning="true"
                  >
                    {d.zipcode}
                  </span>
                </li>
                <div>
                  <button
                    onClick={() => updateData(d._id)}
                    className="bg-green-400 rounded-xl px-4 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(d._id)}
                    className="bg-red-400 rounded-xl px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
                <hr className="my-4" />
              </>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
