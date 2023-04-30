import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { deleteColor, base, deleteHexColor } from "../../../../functions/functions.ts";
import { ToastContainer } from "react-toastify";

const ColorListHex = ({hexColors, setHexColors}) => {
  const [wallpaperCounts, setWallpaperCounts] = useState({});

  const fetchWallpaperCounts = async (colorId) => {
    try {
      const response = await fetch(
        `${base}/api/hex-color/wallpaper-count/${colorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setWallpaperCounts((prevCounts) => ({
        ...prevCounts,
        [colorId]: data.wallpaper_count_color,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    hexColors.forEach((color) => {
      fetchWallpaperCounts(color._id);
    });
  }, [hexColors]);

  const columns = [
    {
      name: "Color Name",
      selector: (row) => row.hex,
    },
    {
      name: "4D",
      selector: (row) => (
        <>
          {row.d4}{" "}
          {wallpaperCounts[row._id] &&
            wallpaperCounts[row._id].wallpaper_4d}
        </>
      ),
    },
    {
      name: "4K",
      selector: (row) => (
        <>
          {row.k4}{" "}
          {wallpaperCounts[row._id] &&
            wallpaperCounts[row._id].wallpaper_4k}
        </>
      ),
    },
    {
      name: "Live",
      selector: (row) => (
        <>
          {row.live}{" "}
          {wallpaperCounts[row._id] &&
            wallpaperCounts[row._id].wallpaper_live}
        </>
      ),
    },
    {
      name: "Time",
      selector: (row) => row.createdAt,
    },
    {
      name: "Hits",
      selector: (row) => row.hit,
    },
    {
      name: "Action",
      selector: (row, index) => {
        return (
          <div className="btn-group">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteHexColor(row._id, setHexColors)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        theme="dark"
        columns={columns}
        data={hexColors}
        pagination
        // selectableRows
        fixedHeader
        fixedHeaderScrollHeight="60vh"
        // selectableRowsHighlight
        highlightOnHover
      />
    </div>
  );
};

export default ColorListHex;
