import React, { useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import Wheel from "@uiw/react-color-wheel";
import {
  fetchCategories,
  fetchTags,
  fetchWallpaperByModel,
  base,
  fetchColors,
  fetchWallpapersWithFilter,
  fetchHexColors,
  AddHexColor
} from "../../../functions/functions.ts";
import Select from "react-select";
import axios from "axios";

const Grid = ({ Heading, model }) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [colors, setColors] = useState([]);
  const [hexcolors, setHexColors] = useState([]);
  useEffect(() => {
    fetchWallpapersWithFilter(setData, filter, currentPage, 100000, model);
  }, [filter]);

  useEffect(() => {
    fetchWallpaperByModel(model, setData);
    fetchCategories(setCategories);
    fetchTags(setTags);
    fetchColors(setColors);
    fetchHexColors(setHexColors);
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

  useEffect(() => {
    setWallpapers(
      data.sort((a, b) => {
        // Sort by number of non-empty fields
        const aNonEmptyFields = Object.values(a).filter(
          (field) => field !== ""
        ).length;
        const bNonEmptyFields = Object.values(b).filter(
          (field) => field !== ""
        ).length;
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
      <h4>Total wallpapers: {data.length}</h4>
      <div style={{ display: "flex", "flex-wrap": "wrap", width: "92%" }}>
        {/* Filter the wallpapers into two arrays */}
        {wallpapers.slice(startIndex, endIndex).map((item, ind) => (
          <div className="col-md-2" key={ind}>
            <div className="col-md-2" key={ind}>
              <Card style={{ width: "210px", margin: 5 }}>
                <Card.Img
                  variant="top"
                  src={"https://stagingapi.inventurs.in/" + item?.thumbnail}
                  style={{ height: "250px" }}
                />
                <Card.Body style={{ padding: 0 }}>
                  <SelectCategory categories={categories} id={item._id} />
                  <MultiSelecti tags={tags} id={item._id} />
                  <SelectColor colors={colors} id={item._id} />
                  <SelectColorHex id={item._id} />
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}
      </div>
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
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
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
            <option value={"Hidden"}>Hidden</option>
            <option value={"Size Up"}>Size Up</option>
            <option value={"Size Down"}>Size Down</option>
            <option value={"Visibility Yes"}>Visibility Yes</option>
            <option value={"Visibility No"}>Visibility No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Grid;

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
            border: "1px solid rgba(0, 0, 0, 0.2)"
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
            width: "100%",
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
          width: "100%",
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
  const [displayMode, setDisplayMode] = useState("colorwheel");
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
  const [opened, setOpened] = useState(false)
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
    <div className="d-flex" style={{
      width: "100%",
      "alignItems": "center",
      "marginLeft": "0.5rem",
      justifyContent: "space-between",
      color: "rgb(131,131,131)"
    }}>Hex Color: <div
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
      /></div>
  );
  const handleModeChange = (mode) => {
    setDisplayMode(mode);
    setPickerVisible(true);
  };

  const pickerMenu = (
    <div className="d-flex">
      <button className="btn btn-sm btn-primary m-2" onClick={() => handleModeChange("colorwheel")}>Color Wheel</button>
      <button className="btn btn-sm btn-primary m-2" onClick={() => handleModeChange("eyedropper")}>Eyedropper</button>
    </div>
  );
  return (
    <div id={id} style={{ display: "flex", alignItems: "center", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "4px" }}>
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
            justifyContent: "center"
          }}
          onMouseLeave={() => { setPickerVisible(false); }}
        >
          {pickerMenu}
          <Wheel color={hsva} onChange={handleColorChange} />
          <button className="btn btn-primary btn-sm m-3" onClick={handleOkClick}>
            OK
          </button>
        </div>
      ) : ("")}
      {pickerVisible && displayMode === "eyedropper" ? (
        (<>
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
              justifyContent: "center"
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
              onClick={() => { setOpened(opened ? false : true) }}
              style={{ width: "80%", height: "2rem", margin: "1rem" }} />
            <button className="btn btn-primary btn-sm m-3" onClick={() => { handleOkClick(); setPickerVisible(false); setOpened(false) }}>
              OK
            </button>
          </div>
        </>
        )) : ""}
    </div>
  );
};