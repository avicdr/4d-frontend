import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SliderPicker } from "react-color";
import Dropzone, { useDropzone } from "react-dropzone";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { createWallpaper, base, fetchTags } from "../../functions/functions.ts";

function WallpaperCreate() {
  const [colour, setcolour] = useState("");
  const [colorsArray, setColorsArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [mainFile, setMainFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isPaid, setisPaid] = useState(false);
  const [model, setModel] = useState("4K");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [hexColors, setHexColors] = useState([]);
  const [hexColor, setHexColor] = useState([]);

  const populateCategory = async () => {
    const response = await axios.post(`${base}/api/category/list`);
    const formattedData = response.data.category.map((category) => ({
      cat_name: category.cat_name,
      _id: category._id,
    }));
    setCategoryArray(formattedData);
  };
  const populateColors = async () => {
    const response = await axios.post(`${base}/api/color/list`);
    const formattedData = response.data.color.map((color) => ({
      color: color.name,
      _id: color._id,
    }));
    setColorsArray(formattedData);
  };
  const populateTags = async () => {
    const response = await axios.post(`${base}/api/tag/list`);
    const formattedData = response.data.tag.map((tag) => ({
      tag: tag.tag,
      _id: tag._id,
    }));
    setTags(formattedData);
  };

  const populateHexColors = async () => {
    const response = await axios.post(`${base}/api/hex-color/list`);
    const formattedData = response.data.color.map((color) => ({
      hex: color.hex,
      _id: color._id,
    }));
    setHexColors(formattedData);
  };

  const onDropMainFile = useCallback((acceptedFiles) => {
    setMainFile(acceptedFiles[0]);
    // console.log(acceptedFiles[0]);
  }, []);
  const onDropThumbNailFile = useCallback((acceptedFiles) => {
    setThumbnailFile(acceptedFiles[0]);
    // console.log(acceptedFiles[0]);
  }, []);

  const handleUpload = useCallback(async () => {
    await createWallpaper({
      category: category,
      price,
      color_code: colour,
      color_hex: hexColor,
      metaTitle: metaTitle,
      paid: isPaid,
      file: mainFile,
      thumbnail: thumbnailFile,
      model: model,
      tag_id: tag,
    });
    // createWallpaper({
    //   category: selected,
    // });
  }, [
    category,
    colour,
    isPaid,
    mainFile,
    metaTitle,
    model,
    price,
    tag,
    thumbnailFile,
  ]);

  const acceptMainFileExtensions = useMemo(() => {
    if (model === "4K") {
      const accept = {
        "image/jpeg": [".jpeg"],
      };
      return accept;
    } else if (model === "4D") {
      const accept = {
        "application/zip": [".zip"],
      };
      return accept;
    } else if (model === "Live") {
      const accept = {
        "image/gif": [".gif"],
        "video/mp4": [".mp4"],
      };
      return accept;
    }
  }, [model]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropMainFile,
    maxFiles: 1,
    accept: acceptMainFileExtensions,
  });
  useEffect(() => {
    populateCategory();
    populateColors();
    populateTags();
    populateHexColors()
  }, []);

  return (
    <>
      <div className="w-80 m-auto">
        <div style={{ backgroundColor: "#1818184a !important" }} className="modal-header">
          <h5
            style={{ width: "95%" }}
            className="modal-title d-flex justify-content-between"
            id="exampleModalLabel"
          >
            Add Wallpaper (Bulk/Single Upload)
          </h5>
          <div className="mx-2">
            <select
              style={{
                width: "200px", borderRadius: "10px", padding: "0.4rem 0.3rem",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0)",
                width: "100%",
                color: "rgb(131,131,131)"
              }}
              className="form-select"
              value={model} // ...force the select's value to match the state variable...
              onChange={(e) => setModel(e.target.value)}
              aria-label="Default select example"
            >
              <option value="4K">4K</option>
              <option value="4D">4D</option>
              <option value="Live">Live</option>
            </select>
          </div>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="col d-flex flex-column">
              <label>Category</label>
              <select
                style={{
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  width: "100%",
                  color: "rgb(131,131,131)"
                }}
                id="categorySelect"
                className="mySelect"
                defaultValue={""}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={""}>Select category</option>
                {categoryArray.map((category) => (
                  <option key={category._id} value={category.cat_name}>
                    {category.cat_name}
                  </option>
                ))}
              </select>
              <button
                style={{ textDecoration: "none", alignSelf: "flex-start"  }}
                type="button"
                className="btn btn-link btn-sm"
              >
                + ADD NEW
              </button>
            </div>
            <div className="col d-flex flex-column">
              <label>Color Name</label>
              <select
                style={{
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  width: "100%",
                  color: "rgb(131,131,131)"
                }}
                id="colorselect"
                className="mySelect"
                defaultValue={""}
                onChange={(e) => setcolour(e.target.value)}
              >
                <option key={""} value={""}>
                  Select Color
                </option>
                {colorsArray.map((color) => (
                  <option key={color._id} value={color.color}>
                    {color.color}
                  </option>
                ))}
              </select>
            </div>

            <div className="col d-flex flex-column mt-3">
              <label>Wallpaper Name</label>
              <input
                style={{
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  width: "100%",
                  color: "rgb(131,131,131)",
                  margin:"0 !important"
                }}
                className="priceInput"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
              <label className="mt-3">Paid / Free</label>
              <select
                style={{
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  width: "100%",
                  color: "rgb(131,131,131)"
                }}
                className="mySelect"
                onChange={(e) => {
                  setisPaid(e.target.value === "free" || e.target.value === "" ? false : true);
                }}
              >
                <option value={""}>Select Status</option>
                <option value={"free"}>Free</option>
                <option value={"paid"}>Paid</option>
              </select>
              {isPaid === true ? (
                <>
                  <label className="mt-3">Price</label>
                  <input
                    style={{
                      padding: "0.4rem 0.3rem",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "4px",
                      width: "100%",
                      color: "rgb(131,131,131)",
                      outline: "none"
                    }}
                    type="text"
                    placeholder="Enter Price"
                    className="priceInput"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="col d-flex mt-3 flex-column">
              <label>Tags</label>
              <select
                style={{
                  padding: "0.4rem 0.3rem",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "4px",
                  width: "100%",
                  color: "rgb(131,131,131)"
                }}
                id="colorselect"
                className="mySelect"
                defaultValue={"none"}
                onChange={(e) => setTag(e.target.value)}
              >
                <option key={"none"} value={"none"}>
                  None
                </option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.tag}
                  </option>
                ))}
              </select>
              <a href="/tag" className="mb-3">
                <button
                  style={{ textDecoration: "none", alignSelf: "flex-start" }}
                  type="button"
                  className="btn btn-link btn-sm"
                >
                  + ADD NEW
                </button>
              </a>
            </div>
            <div className="row drop-border">
              <h3>Main File</h3>

              <Dropzone>
                {() => (
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      height: "100px",
                      cursor: "pointer",
                      margin: "10px 0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <input {...getInputProps()} />

                    <p>
                      <i className="fa fa-picture-o" aria-hidden="true"></i>
                      <br />
                      Upload an (File Formate .png, .jpg & .zip etc...) file
                    </p>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="row drop-border">
              <h3>Thumbnail File</h3>
              <Dropzone
                onDrop={onDropThumbNailFile}
                maxFiles={1}
                accept={{
                  "image/jpeg": [".jpg", ".jpeg"],
                  "image/png": [".png"],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      height: "100px",
                      cursor: "pointer",
                      margin: "10px 0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <input {...getInputProps()} />

                    <p>
                      <i className="fa fa-picture-o" aria-hidden="true"></i>
                      <br />
                      Upload an (File Formate .png, .jpg & .zip etc...) file
                    </p>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
        <div className="modal-footer justify-content-center">
          <button
            type="button"
            className="btn"
                        style={{
                          padding: "8px 16px",
                          background:
                            "linear-gradient(101.43deg, #FBD341 0%, #C59431 100%)",
                          borderRadius: "12px",
                          color: "white",
                          fontWeight: "bold",
                        }}
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default WallpaperCreate;
