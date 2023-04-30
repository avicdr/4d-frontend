import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import {
  fetchTags,
  fetchWallpapers,
  fetchCategories,
  base,
  getTotalWallpapers,
  fetchColors,
  fetchWallpapersWithFilter,
  fetchHexColors,
  AddHexColor,
} from "../../functions/functions.ts";
import Wheel from "@uiw/react-color-wheel";
import axios from "axios";
import FormData from "form-data";
import { TailSpin } from "react-loader-spinner";

function WallpaperList() {
  const [totalWallpapers, setTotalWallpapers] = useState(1);
  useEffect(() => {
    getTotalWallpapers(setTotalWallpapers);
  }, []);

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [hexColors, setHexColors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTags(setTags);
    fetchCategories(setCategories);
    fetchColors(setColors);
    fetchHexColors(setHexColors);
  }, []);
  useEffect(() => {
    if (totalWallpapers === 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [totalWallpapers]);

  const columns = [
    {
      name: "Tags",
    },
    {
      name: "Price",
    },
    {
      name: "Category Name",
    },
    {
      name: "Color Name",
    },
    {
      name: "Color Hex",
    },
    {
      name: "Thumbnail",
      selector: (row) => row.Thmbnl,
    },
    {
      name: "File",
      selector: (row) => row.file,
    },
    {
      name: "Last Updated",
    },
    {
      name: "Status",
    },
    {
      name: "Visible",
    },
    {
      name: "Total Downloads",
    },
    {
      name: "Likes",
    },
  ];

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 50;
  useEffect(() => {
    if (filter === "") {
      fetchWallpapers(setData, currentPage, itemsPerPage);
    } else {
      fetchWallpapersWithFilter(setData, filter, currentPage, itemsPerPage);
    }
    window.scrollTo(0, 0);
  }, [currentPage, filter]);

  const totalPages = Math.ceil(totalWallpapers / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#007bff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="d-flex flex-column align-items-center justify-content-center"
          visible={loading}
        />
      ) : (
        ""
      )}
      {!loading ? (
        <>
          <h4>Total wallpapers: {totalWallpapers}</h4>
          <div style={{ overflowX: "scroll" }} className="m-3">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  {columns.map((item, ind) => {
                    return (
                      <th key={ind} scope="col">
                        {item.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((item, ind) => {
                  return (
                    <tr key={ind}>
                      <td>
                        <MultiSelecti tags={tags} id={item._id} />
                      </td>

                      <td>
                        {" "}
                        {/* <div className="table-input" key={ind}> */}
                        <input
                          placeholder={Number(item?.price)}
                          id={item._id}
                          disabled={item.paid !== "PAID" ? true : false}
                          style={{
                            width: "100px",
                            margin: "0.2rem",
                            padding: "0.3rem",
                            borderRadius: "4px",
                            outline: "none",
                            background: "none"
                          }}
                          onChange={async (e) => {
                            const form = new FormData();
                            form.append("price", Number(e.target.value));
                            await axios({
                              method: "post",
                              url: `${base}/api/wallpaper/update/${item._id}`,
                              data: form,
                              headers: {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              },
                            });
                          }}
                        />
                        {/* </div> */}
                      </td>
                      <td>
                        <SelectCategory categories={categories} id={item._id} />
                      </td>
                      <td>
                        <SelectColor colors={colors} id={item._id} />
                      </td>
                      <td>
                        <SelectColorHex id={item._id} />
                      </td>
                      <td>
                        <div className="d-flex " key={ind}>
                          <a
                            href={
                              "https://stagingapi.inventurs.in/" +
                              item?.thumbnail
                            }
                            download
                            target="_blank"
                          >
                            <img
                              style={{
                                height: "35px",
                                width: "35px",
                                objectFit: "cover",
                                margin: "0px 5px",
                                cursor: "pointer",
                              }}
                              src={
                                "https://stagingapi.inventurs.in/" +
                                item?.thumbnail
                              }
                            />
                          </a>
                          <span
                            onClick={(e) => {
                              e.preventDefault();
                              // handleDownload(item?.thumbnail);
                            }}
                          >
                            <i
                              className="fa fa-download "
                              aria-hidden="true"
                              style={{ color: "#0d6efd", cursor: "pointer" }}
                            ></i>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex" key={ind}>
                          <img
                            style={{
                              height: "35px",
                              width: "35px",
                              objectFit: "cover",
                              margin: "0px 5px",
                            }}
                            src="https://mobimg.b-cdn.net/v3/fetch/05/05eeb93a2e41734ecb6044146351f11e.jpeg"
                          />
                          <a href={item?.file} download>
                            <i
                              className="fa fa-download "
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      </td>
                      <td style={{ width: "300px !important" }}>
                        <span>{item?.time}</span>
                      </td>
                      <td>
                        <SingleSelect id={item._id} />
                      </td>
                      <td>
                        <SingleSelectVisibility id={item._id} />
                      </td>
                      <td>{item?.ttl_downld}</td>
                      <td>{item?.likes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const showButton =
                page <= 5 ||
                (page > currentPage - 4 && page < currentPage + 4) ||
                page > totalPages - 5;

              if (!showButton) {
                return null;
              }

              return (
                <button
                  className={`pagination-btn${currentPage === page ? " active" : ""
                    }`}
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </button>
            <select
              defaultValue={""}
              style={{
                position: "absolute",
                right: "2rem",
                outline: "none",
                padding: "0.4rem 0.3rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderRadius: "4px",
                color: "rgb(131,131,131)"
              }}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value={""}>None</option>
              <option value={"No Category"}>No Category</option>
              <option value={"No Colors"}>No Colors</option>
              <option value={"No Tags"}>No Tag</option>
              <option value={"Date Latest"}>Date Latest</option>
              <option value={"Date Oldest"}>Date Oldest</option>
              <option value={"Paid"}>Paid</option>
              <option value={"Free"}>Free</option>
              <option value={"Download Up"}>Download Up</option>
              <option value={"Download Down"}>Download Down</option>
              <option value={"Hide"}>Hidden</option>
              <option value={"Size Up"}>Size Up</option>
              <option value={"Size Down"}>Size Down</option>
            </select>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

const SingleSelect = ({ id }) => {
  const [isPaid, setIsPaid] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${base}/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      setIsPaid(data.paid);
    };
    getData();
  }, []);

  const [paid, setPaid] = useState("FREE");
  const updateWallpaper = useCallback(
    async (_paid) => {
      try {
        console.log(_paid);
        const form = new FormData();
        form.append("paid", _paid);
        await axios({
          method: "post",
          url: `${base}/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [paid]
  );
  const handleSelect = (e) => {
    setPaid(e.target.value);
    updateWallpaper(e.target.value);
    if (paid != "PAID") {
      document.getElementById(id).disabled = false;
    } else {
      document.getElementById(id).disabled = true;
    }
  };

  return (
    <div id={id} style={{ width: 130 }}>
      <select
        onChange={handleSelect}
        style={{
          padding: "0.4rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          width: "100%",
          color: "rgb(131,131,131)"
        }}
      >
        <option value={"FREE"} selected={isPaid !== "PAID"}>
          Free
        </option>
        <option value={"PAID"} selected={isPaid === "PAID"}>
          Paid
        </option>
      </select>
    </div>
  );
};

const SingleSelectVisibility = ({ id }) => {
  const [hide, setHide] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${base}/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;

      setHide(data.hide);
    };
    getData();
    // console.log(hide)
  }, []);

  const [hidden, setHidden] = useState("");
  const updateWallpaper = useCallback(
    async (_hide) => {
      try {
        // await axios.post(
        //   `${base}/api/wallpaper/update/${id}`,
        //   {
        //     hide: _hide,
        //   },
        //   {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   }
        // );

        const form = new FormData();
        form.append("hide", _hide);
        await axios({
          method: "post",
          url: `${base}/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [hidden]
  );

  const handleSelect = (e) => {
    setHidden(e.target.value);
    // console.log(e.target.value)
    updateWallpaper(e.target.value);
  };
  // console.log(isPaid)
  return (
    <div id={id} style={{ width: 130 }}>
      <select
        onChange={handleSelect}
        style={{
          padding: "0.4rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          width: "100%",
          color: "rgb(131,131,131)"
        }}
      >
        <option value={"Yes"} selected={hide === "Yes"}>
          No
        </option>
        <option value={"No"} selected={hide !== "Yes"}>
          Yes
        </option>
      </select>
    </div>
  );
};

const MultiSelecti = ({ tags, id }) => {
  const [prevTags, setPrevTags] = useState([]);
  const options = tags.map((item) => {
    return { label: item.tag, value: item._id };
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${base}/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      setPrevTags(data.tag);
    };
    getData();
  }, []);
  const [newTags, setNewTags] = useState([]);
  const updateWallpaper = useCallback(
    async (_tags) => {
      try {
        const form = new FormData();
        form.append("tag", _tags);
        await axios({
          method: "post",
          url: `${base}/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [newTags]
  );
  const handleSelect = (selectedList) => {
    const newTags = selectedList.map((item) => item.value);
    setNewTags(newTags);
    updateWallpaper(newTags);
  };

  return (
    <div style={{ width: "100%", border: "none" }}>
      <Select
        defaultValue={prevTags}
        options={options}
        onChange={handleSelect}
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "rgb(0 0 0 / 0%)",
            color: "hsl(0, 0%, 20%)",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            width: "max-content"
          }),
        }}
      />
    </div>
  );
};

const SelectCategory = ({ categories, id }) => {
  const [cat_name, setCatName] = useState(null);
  const options = categories.map((item) => {
    return { label: item.cat_name, value: item._id };
  });

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${base}/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      setCatName(data.cat_name);
    };
    getData();
  }, [id]);

  const updateWallpaper = useCallback(
    async (_cat_name) => {
      try {
        const form = new FormData();
        form.append("cat_name", _cat_name);
        await axios({
          method: "post",
          url: `${base}/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [cat_name, id]
  );

  const handleSelect = (selectedItem) => {
    setCatName(selectedItem);
    updateWallpaper(selectedItem);
  };

  return (
    <div id={id} style={{ width: "100%", border: "none" }}>
      {cat_name != null ? (
        <select
          value={cat_name}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            padding: "0.4rem 0.3rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderRadius: "4px",
            width: "fit-content",
            color: "rgb(131,131,131)"
          }}
        >
          {" "}
          <option key={""} value={"none"}>
            Select Category
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <select style={{
          padding: "0.4rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          width: "fit-content",
          color: "rgb(131,131,131)"
        }}><option key={""} value={"none"}>
            Select Category
          </option></select>
      )}
    </div>
  );
};


const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "0.1rem 0.1rem",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: "4px",
    width: "100%",
    color: "rgb(131,131,131)",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0.5rem",
    position: "relative",
    backgroundColor: "rgba(120, 120, 120, 0.68)",
    color: state.data.color,
    fontWeight: "bold"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontWeight: "bold",
    fontSize: "1rem"
  })
};

const SelectColor = ({ colors, id }) => {
  const [color_code, setColorCode] = useState("");
  const options = [
    { label: "No Color", color: "#fff", value: "none" }, // default option
    ...colors.map((item) => {
      return { label: item.name, color: item.hash_code, value: item.name };
    })
  ];  

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`${base}/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      setColorCode(data.color_code);
    };
    getData();
  }, []);

  const updateWallpaper = useCallback(
    async (_color_code) => {
      try {
        const form = new FormData();
        form.append("color_code", _color_code);
        await axios({
          method: "post",
          url: `${base}/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [color_code]
  );

  const handleSelect = (selectedOption) => {
    setColorCode(selectedOption.value);
    updateWallpaper(selectedOption.value);
  };

  return (
    <div id={id} style={{ width: "100%", border: "none" }}>
      <Select
        options={options}
        defaultValue={options.find((option) => option.value === color_code)}
        styles={customStyles}
        onChange={handleSelect}
      />
    </div>
  );
};


const SelectColorHex = ({ id }) => {
  const [colorHex, setColorHex] = useState("#000000");
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [pickerVisible, setPickerVisible] = useState(false);
  const hexToHsva = (hexColor, alpha = 1) => {
    // Convert hex to RGB
    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);

    // Convert RGB to HSV
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 0;
    let saturation = 0;
    const value = max / 255;

    if (delta !== 0) {
      if (max === red) {
        hue = ((green - blue) / delta) % 6;
      } else if (max === green) {
        hue = (blue - red) / delta + 2;
      } else {
        hue = (red - green) / delta + 4;
      }
      saturation = delta / max;
    }

    hue = Math.round(hue * 60);
    saturation = Math.round(saturation * 100);
    const hsva = {
      h: hue,
      s: saturation,
      v: Math.round(value * 100),
      a: alpha,
    };
    return hsva;
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`${base}/api/wallpaper/list/${id}`);
      const data = response.data.wallpaper;
      if (data.color_hex) {
        const hsva = hexToHsva(data.color_hex);
        setColorHex(data.color_hex);
        setHsva(hsva);
      }
    };
    fetchData();
  }, []);

  const handleColorChange = (color) => {
    const hsva = color.hsva;
    setHsva(hsva);
    setColorHex(color.hex);
  };

  const handleOkClick = useCallback(() => {
    updateWallpaper(colorHex);
    setPickerVisible(false);
  }, [colorHex]);

  const updateWallpaper = useCallback(
    async (colorHex) => {
      try {
        const form = new FormData();
        form.append("color_hex", colorHex);
        await axios({
          method: "post",
          url: `${base}/api/wallpaper/update/${id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
        AddHexColor(colorHex);
      } catch (err) {
        // console.log(err);
      }
    },
    [id]
  );

  const colorButton = (
    <div
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: colorHex,
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onMouseEnter={() => {
        setPickerVisible((pickerVis) => (pickerVis ? false : true));
      }}
    />
  );

  return (
    <div id={id} style={{ display: "flex", alignItems: "center" }}>
      {colorButton}
      {pickerVisible && (
        <div
          style={{
            position: "absolute",
            // marginLeft: "2rem",
            background: "#181818E6",
            padding: "2rem",
            borderRadius: "30px",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
          onMouseLeave={() => { setPickerVisible(false); }}
        >
          <Wheel color={hsva} onChange={handleColorChange} />
          <button className="btn btn-sm m-2 btn-primary" onClick={handleOkClick}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};
export default WallpaperList;
