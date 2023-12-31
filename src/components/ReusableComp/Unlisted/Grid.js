import React, { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import Wheel from "@uiw/react-color-wheel";
import axiosInstance, {
  fetchCategories,
  fetchTags,
  fetchWallpaperByModel,
  base,
  fetchWallpapersWithFilter,
} from "../../../functions/functions.ts";
import Select from "react-select";
import ntc from "ntcjs";
import {
  successPopup,
  infoPopup,
  errorPopup,
} from "../../../functions/popupMessages.js";

const Grid = ({ model }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPageNumber, setNewPageNumber] = useState(null);
  const itemsPerPage = 50;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "");
  useEffect(() => {
    localStorage.setItem("filter", filter);
    fetchWallpapersWithFilter(setData, filter, 1, 10000000000, model);
    window.scrollTo(0, 0);
  }, [currentPage, filter]);

  useEffect(() => {
    fetchWallpaperByModel(model, setData);
    fetchCategories(setCategories);
    fetchTags(setTags);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const SelectColorHex = ({ item }) => {
    const [opened, setOpened] = useState(false);
    const [displayMode, setDisplayMode] = useState("colorwheel");
    const [colorHex, setColorHex] = useState("#000000");
    const [colorName, setColorName] = useState("");
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
    const [pickerVisible, setPickerVisible] = useState(false);
    const id = item._id;
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
      if (item.color_hex) {
        const hsva = hexToHsva(item.color_hex);
        setColorHex(item.color_hex);
        setHsva(hsva);
      }
    }, []);

    const handleColorChange = (color) => {
      const hsva = color.hsva;
      setHsva(hsva);
      setColorHex(color.hex);
      const n_match = ntc.name(color.hex);
      let color_name = n_match[1];
      setColorName(color_name);
    };

    const handleOkClick = () => {
      updateWallpaper(colorHex);
      setPickerVisible(false);
    };

    const updateWallpaper = async (color_Hex) => {
      try {
        document.getElementById(id + "_color").innerHTML = `${colorName}`;
        document.getElementById(
          id + "_color"
        ).style.color = `${colorHex} !important`;
        const form = new FormData();
        form.append("color_hex", color_Hex);
        form.append("color_code", colorName);
        await axiosInstance({
          method: "post",
          url: `/api/wallpaper/update/${item._id}`,
          data: form,
          headers: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        });
        // AddHexColor(colorHex);
        try {
          await axiosInstance.post(`/api/color/create`, {
            color_code: color_Hex,
          });
          successPopup("Color created successfully");
          await axiosInstance.post(`/api/color/list`);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            infoPopup("Color already exists");
          } else {
            errorPopup("Failed to create color");
          }
        }
      } catch (err) {
        // console.log(err);
      }
    };

    const colorButton = (
      <div
        className="d-flex"
        style={{
          width: "100%",
          alignItems: "center",
          marginLeft: "0.5rem",
          justifyContent: "space-between",
          color: "rgb(131,131,131)",
        }}
      >
        Hex Color:{" "}
        <div
          id={id + "_color_btn"}
          style={{
            width: "40%",
            height: "27px",
            margin: "4px",
            backgroundColor: colorHex,
            cursor: "pointer",
            borderRadius: "12px",
          }}
          onMouseEnter={() => {
            setPickerVisible(pickerVisible ? false : true);
          }}
        />
      </div>
    );
    const handleModeChange = (mode) => {
      setDisplayMode(mode);
      setPickerVisible(true);
    };

    const pickerMenu = (
      <div className="d-flex">
        <button
          className="btn btn-sm btn-primary m-2"
          onClick={() => handleModeChange("colorwheel")}
        >
          Color Wheel
        </button>
        <button
          className="btn btn-sm btn-primary m-2"
          onClick={() => handleModeChange("eyedropper")}
        >
          Eyedropper
        </button>
      </div>
    );
    return (
      <div
        id={item._id}
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
        }}
      >
        {colorButton}
        {pickerVisible && displayMode === "colorwheel" ? (
          <div
            style={{
              position: "absolute",
              marginLeft: "5rem",
              background: "#181818E6",
              padding: "2rem",
              borderRadius: "30px",
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onMouseLeave={() => {
              setPickerVisible(false);
            }}
          >
            {pickerMenu}
            <Wheel color={hsva} onChange={handleColorChange} />
            <button
              className="btn btn-primary btn-sm m-3"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        ) : (
          ""
        )}
        {pickerVisible && displayMode === "eyedropper" ? (
          <>
            <div
              style={{
                position: "absolute",
                marginLeft: "5rem",
                background: "#181818E6",
                padding: "2rem",
                borderRadius: "30px",
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onMouseLeave={() => {
                if (!opened) {
                  setPickerVisible(false);
                }
              }}
            >
              {pickerMenu}
              <input
                type="color"
                id="selectcolorinput"
                value={colorHex}
                onChange={(e) => {
                  const hexColor = e.target.value;
                  const hsva = hexToHsva(hexColor);
                  setColorHex(hexColor);
                  setHsva(hsva);
                }}
                onClick={() => {
                  setOpened(opened ? false : true);
                }}
                style={{ width: "80%", height: "2rem", margin: "1rem" }}
              />
              <button
                className="btn btn-primary btn-sm m-3"
                onClick={() => {
                  handleOkClick();
                  setPickerVisible(false);
                  setOpened(false);
                }}
              >
                OK
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  useEffect(() => {
    setWallpapers(
      data.sort((a, b) => {
        // Sort by number of non-empty fields
        const aNonEmptyFields = Object.values(a).filter((field) => field !== "")
          .length;
        const bNonEmptyFields = Object.values(b).filter((field) => field !== "")
          .length;
        if (aNonEmptyFields !== bNonEmptyFields) {
          return aNonEmptyFields - bNonEmptyFields;
        }

        // Sort by number of empty fields
        const aEmptyFields = [
          a.color_hex,
          a.color_code,
          a.tag.length === 0,
          a.cat_name === "",
        ].filter((field) => field).length;
        const bEmptyFields = [
          b.color_hex,
          b.color_code,
          b.tag.length === 0,
          b.cat_name === "",
        ].filter((field) => field).length;
        return bEmptyFields - aEmptyFields;
      })
    );
  }, [data]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h4>Total wallpapers: {wallpapers.length}</h4>
      <select
        defaultValue={"Date Latest"}
        style={{
          position: "absolute",
          right: "2rem",
          outline: "none",
          padding: "0.4rem 0.3rem",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          color: "rgb(131,131,131)",
        }}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        value={filter}
      >
        <option value="">No Filters</option>
        <option value={"With Primary"}>With Primary</option>
        <option value={"No Primary"}>No Primary</option>
        <option value={"No Category"}>No Category</option>
        <option value={"No Colors"}>No Colors</option>
        <option value={"No Tags"}>No Tag</option>
        <option value={"Date Oldest"}>Date Oldest</option>
        <option value={"Date Latest"}>Date Latest</option>
        <option value={"Like Up"}>Like Up</option>
        <option value={"Like Down"}>Like Down</option>
        <option value={"Download Up"}>Download Up</option>
        <option value={"Download Down"}>Download Down</option>
        <option value={"Hide"}>Hidden</option>
        <option value={"Size Up"}>Size Up</option>
        <option value={"Size Down"}>Size Down</option>
      </select>
      <div
        className=" justify-content-center m-auto"
        style={{ display: "flex", "flex-wrap": "wrap", width: "92%" }}
      >
        {wallpapers.slice(startIndex, endIndex).map((item, ind) => (
          <div className="mx-3 my-2" key={ind} style={{ maxWidth: "18%" }}>
            <div className="col-md-4" key={ind}>
              <Card style={{ width: "180px", margin: 5 }}>
                <Card.Img
                  variant="top"
                  src={"http://localhost:4000/" + item?.thumbnail}
                  style={{ height: "250px" }}
                />

                <SelectCategory categories={categories} item={item} />
                <TagSelect tags={tags} item={item} />
                {/* <SelectColor colors={colors} item={item} /> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.4rem 0.3rem",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                >
                  <span style={{ color: "rgb(131,131,131)" }}>Color:</span>{" "}
                  <span
                    id={item._id + "_color"}
                    style={{
                      color: item.color_hex
                        ? item.color_hex
                        : "rgb(131,131,131)",
                    }}
                  >
                    {item.color_code ? item.color_code : "N.A"}
                  </span>
                </div>
                <SelectColorHex item={item} />
              </Card>
            </div>
          </div>
        ))}
      </div>
      {wallpapers.length === 0 && (
        <div className="w-100 m-auto text-center">
          <h1>NO DATA TO DISPLAY</h1>
        </div>
      )}
      <div className="m-2" style={{ alignSelf: "flex-start" }}>
        <div className="">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
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
                className={`pagination-btn${
                  currentPage === page ? " active" : ""
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
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <input
            type="text"
            placeholder="Page.."
            value={newPageNumber}
            style={{
              background: "none",
              border: "1px solid rgba(0,0,0,0.2)",
              width: "4rem",
              padding: "0.3rem",
              marginLeft: "4rem",
              borderRadius: "6px",
              color: "rgb(131,131,131)",
            }}
            onChange={(e) => {
              setNewPageNumber(Number(e.target.value));
            }}
          />
          <button
            className="pagination-btn active"
            onClick={() => {
              if (newPageNumber > totalPages || newPageNumber === 0) {
                alert("No page exists");
                setNewPageNumber(currentPage);
              } else {
                setCurrentPage(newPageNumber);
              }
            }}
          >
            Go
          </button>
          <select
            defaultValue={"Date Latest"}
            value={filter}
            style={{
              position: "absolute",
              right: "2rem",
              outline: "none",
              padding: "0.4rem 0.3rem",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderRadius: "4px",
              color: "rgb(131,131,131)",
            }}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="">No Filters</option>
            <option value={"With Primary"}>With Primary</option>
            <option value={"No Primary"}>No Primary</option>
            <option value={"No Category"}>No Category</option>
            <option value={"No Colors"}>No Colors</option>
            <option value={"No Tags"}>No Tag</option>
            <option value={"Date Oldest"}>Date Oldest</option>
            <option value={"Date Latest"}>Date Latest</option>
            <option value={"Like Up"}>Like Up</option>
            <option value={"Like Down"}>Like Down</option>
            <option value={"Download Up"}>Download Up</option>
            <option value={"Download Down"}>Download Down</option>
            <option value={"Hide"}>Hidden</option>
            <option value={"Size Up"}>Size Up</option>
            <option value={"Size Down"}>Size Down</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Grid;

const TagSelect = ({ tags, item }) => {
  const [prevTags, setPrevTags] = useState([]);
  const options = tags.map((item) => {
    return { label: item.tag, value: item._id };
  });

  useEffect(() => {
    setPrevTags(item.tag);
  }, []);
  const [newTags, setNewTags] = useState([]);
  const updateWallpaper = useCallback(async (_tags) => {
    try {
      const form = new FormData();
      form.append("tag", _tags);
      await axiosInstance({
        method: "post",
        url: `/api/wallpaper/update/${item._id}`,
        data: form,
        headers: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } catch (err) {
      // console.log(err);
    }
  }, []);
  const handleSelect = (selectedList) => {
    const newTags = selectedList.map((item) => item.value);
    setNewTags(newTags);
    updateWallpaper(newTags);
  };

  return (
    <div style={{ width: "100%", border: "none" }}>
      <Select
        placeholder="Select Tags"
        defaultValue={prevTags}
        options={options}
        onChange={handleSelect}
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "rgb(0 0 0 / 0%)",
            color: "white",
            border: "1px solid rgba(0, 0, 0, 0.2)",
          }),
          option: (provided, state) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 0.5rem",
            position: "relative",
            backgroundColor: "white",
            color: "black",
          }),
        }}
      />
    </div>
  );
};

const SelectCategory = ({ categories, item }) => {
  const [cat_name, setCatName] = useState(null);
  const options = categories.map((option) => {
    return { label: option.cat_name, value: option._id };
  });

  useEffect(() => {
    setCatName(item.cat_name);
  }, [item.cat_name]);

  const updateWallpaper = useCallback(async (_cat_name) => {
    try {
      const form = new FormData();
      form.append("cat_name", _cat_name);
      await axiosInstance({
        method: "post",
        url: `/api/wallpaper/update/${item._id}`,
        data: form,
        headers: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
    } catch (err) {
      // console.log(err);
    }
  }, []);

  const handleSelect = (selectedItem) => {
    setCatName(selectedItem);
    updateWallpaper(selectedItem);
  };

  return (
    <div id={item._id} style={{ width: "100%", border: "none" }}>
      {cat_name != null ? (
        <select
          value={cat_name}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            padding: "0.4rem 0.3rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderRadius: "4px",
            width: "100%",
            color: "rgb(131,131,131)",
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
        <select
          style={{
            padding: "0.4rem 0.3rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderRadius: "4px",
            width: "100%",
            color: "rgb(131,131,131)",
          }}
        >
          <option key={""} value={"none"}>
            Select Category
          </option>
        </select>
      )}
    </div>
  );
};

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     padding: "0.1rem 0.1rem",
//     border: "1px solid rgba(0, 0, 0, 0.2)",
//     backgroundColor: "rgba(0, 0, 0, 0)",
//     borderRadius: "4px",
//     width: "100%",
//     color: "rgb(131,131,131)",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     display: "flex",
//     alignItems: "center",
//     padding: "0.5rem 0.5rem",
//     position: "relative",
//     backgroundColor: "rgba(120, 120, 120, 0.68)",
//     color: state.data.color,
//     fontWeight: "bold",
//   }),
//   singleValue: (provided, state) => ({
//     ...provided,
//     color: state.data.color,
//     fontWeight: "bold",
//     fontSize: "1rem",
//   }),
// };

// const SelectColor = ({ colors, item }) => {
//   const [color_code, setColorCode] = useState("");
//   const options = [
//     { label: "No Color", color: "#fff", value: "none" }, // default option
//     ...colors.map((item) => {
//       return { label: item.name, color: item.hash_code, value: item.name };
//     }),
//   ];

//   useEffect(() => {
//     setColorCode(item.color_code);
//   }, []);

//   const updateWallpaper = useCallback(async (_color_code) => {
//     try {
//       const form = new FormData();
//       form.append("color_code", _color_code);
//       await axiosInstance({
//         method: "post",
//         url: `/api/wallpaper/update/${item._id}`,
//         data: form,
//         headers: {
//           headers: { "Content-Type": "multipart/form-data" },
//         },
//       });
//     } catch (err) {
//       // console.log(err);
//     }
//   }, []);

//   const handleSelect = (selectedOption) => {
//     setColorCode(selectedOption.value);
//     updateWallpaper(selectedOption.value);
//   };

//   return (
//     <div id={item._id} style={{ width: "100%", border: "none" }}>
//       <Select
//         placeholder="Select Color"
//         options={options}
//         defaultValue={options.find((option) => option.value === color_code)}
//         styles={customStyles}
//         onChange={handleSelect}
//       />
//     </div>
//   );
// };
