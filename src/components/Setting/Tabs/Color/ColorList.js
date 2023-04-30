import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { deleteColor, base } from "../../../../functions/functions.ts";

const ColorList = ({colors, setColors}) => {
  const [wallpaperCounts, setWallpaperCounts] = useState({});

  const fetchWallpaperCounts = async (colorId) => {
    try {
      const response = await fetch(
        `${base}/api/color/wallpaper-count/${colorId}`,
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
    colors.forEach((color) => {
      fetchWallpaperCounts(color._id);
    });
  }, [colors]);

  const columns = [
    {
      name: "Color Name",
      selector: (row) => row.name,
    },
    {
      name: "Color Hex",
      selector: (row) => row.hash_code,
    },
    {
      name: "Color Preview",
      selector: (row) => <div style={{backgroundColor: `${row.hash_code}`, width: "20px", height: "20px",margin: "auto", borderRadius: "50%"}}></div>,
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
      selector: (row) => {
        let date = new Date(row.createdAt)
        const localDate = date.toLocaleString()
        return localDate;
      },
    },
    {
      name: "Hits",
      selector: (row) => row.hit || 0,
    },
    {
      name: "Action",
      selector: (row, index) => {
        return (
          <div className="btn-group">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteColor(row._id, setColors)}
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
        data={colors}
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

export default ColorList;
