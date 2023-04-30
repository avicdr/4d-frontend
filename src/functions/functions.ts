import React from "react";
import axios from "axios";
import { errorPopup, successPopup, infoPopup } from "./popupMessages";
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] ='application/x-www-form-urlencoded';
// export const base = `http://localhost:4000`;
export const base = `https://stagingapi.inventurs.in`;

const axiosInstance = axios.create({
  baseURL: base,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

export default axiosInstance;

export async function authenticateUser(email: string, password: string) {
  try {
    const response = await axiosInstance.post(`/api/auth/login`, {
      email,
      password,
    });
    if (response.data.success) {
      localStorage.setItem("isAuthenticated", "true");
      window.location.reload();
    }
  } catch (error) { }
}
export async function fetchCategories(
  setCategories: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const response = await axiosInstance.post(`/api/category/list`);
    // console.log(response.data.category)
    setCategories(response.data.category);
  } catch (error) { }
}

export async function handleCategoryDelete(
  id: string,
  setCategories: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    await axiosInstance.delete(`/api/category/delete/${id}`);
    fetchCategories(setCategories);
    successPopup(`Category deleted successfully`);
  } catch (error) {
    errorPopup(`There was a problem in deleting category`);
  }
}

export async function createCategory(
  name: string,
  file: File,
  setCategories: React.Dispatch<React.SetStateAction<any[]>>
): Promise<any> {
  try {
    // Check if name already exists
    const response = await axiosInstance.post(`/api/category/list`);
    const existingCategory = response.data.category.find(
      (category: any) => category.cat_name === name
    );
    if (existingCategory) {
      infoPopup(`Category with name ${name} already exists`);
    }
    // Create new category
    const formData = new FormData();
    formData.append("cat_name", name);
    formData.append("thumbnail", file);
    try {
      await axios({
        method: "post",
        url: `/api/category/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(response);
      successPopup(`Category created successfully`);
      fetchCategories(setCategories);
    } catch (error) {
      // console.log(error);
    }
  } catch (error) {
    // console.log(error);
    errorPopup(`Error creating category`);
  }
}

export async function fetchWallpapers(
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  page: string,
  limit: string
) {
  try {
    // Check if name already exists
    const response = await axiosInstance.post(`/api/wallpaper/list`, {
      page,
      limit,
    });
    setData(response.data.wallpaper);
  } catch (error) { }
}

export async function fetchTags(
  setTags: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const response = await axiosInstance.post(`/api/tag/list`);
    setTags(response.data.tag);
  } catch (error) { }
}

export async function createTag(
  tag: string,
  setTags: React.Dispatch<React.SetStateAction<any[]>>
) {
  // Check if name already exists
  const response = await axiosInstance.post(`/api/tag/list`);
  const existingTag = response.data.tag.find(
    (category: any) => category.tag === tag
  );
  if (existingTag) {
    infoPopup(`Tag with name ${tag} already exists`);
  }

  // Create new category
  const formData = new FormData();
  formData.append(`tag`, tag);
  try {
    const reponse = await axios({
      method: "POST",
      url: `/api/tag/create`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(reponse)
    successPopup("Tag Created Successfully");
    fetchTags(setTags);
  } catch (error) {
    errorPopup(`There was an error creating the tag`);
  }
}

export async function editTag(
  newName: string,
  id: string,
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  const formData = new FormData();
  formData.append("tag", newName);

  await axios({
    method: "post",
    url: `/api/tag/update/${id}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  successPopup("Tag Edited Successfully");
  fetchTags(setData);
}

export async function deleteTag(
  id: string,
  setTags: React.Dispatch<React.SetStateAction<any[]>>
) {
  // console.log(newName, `      `, id)
  await axiosInstance.delete(`/api/tag/delete/${id}`);
  fetchTags(setTags);
  successPopup("Tag Deleted Successfully");
}

export async function createWallpaper({
  category,
  tag,
  file,
  thumbnail,
  paid,
  color_code,
  price,
  model,
}: {
  metaTitle: string;
  category: string;
  tag: Array<string>;
  file: File;
  thumbnail: File;
  paid: string;
  color_code: string;
  price: string;
  model: string;
}) {
  // send formdata and string data together
  const formData = new FormData();
  formData.append("files", file);
  formData.append(
    "files",
    thumbnail,
    file.name.split(".")[0] + "_thumb" + "." + thumbnail.name.split(".")[1]
  );

  try {
    await axiosInstance.post(`/api/wallpaper/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        category,
        tag,
        paid,
        color_code,
        price,
        model,
      },
    });
    successPopup(`Wallpaper created successfully`);
  } catch (error) {
    // console.log(error);
  }
}

export async function getUserData(
  setUsers: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const response = await axiosInstance.post(`/api/admin/users/list`);
    setUsers(response.data.users);
  } catch (error) { }
}

export async function fetchWallpaperByModel(
  model: string,
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  page: string,
  limit: string
) {
  try {
    // Check if name already exists
    const response = await axiosInstance.post(
      `/api/search/modelSearch/${model}`,
      { page, limit }
    );
    setData(response.data.Wallpaper);
    // console.log(response.data.Wallpaper)
  } catch (error) { }
}

export async function getTotalWallpapers(
  setData: React.Dispatch<React.SetStateAction<any[]>>,
) {
  try {
    // Check if name already exists
    const response = await axiosInstance.post(`/api/admin/wallpaper/total`);
    setData(response.data.wallpaper_total);
    // console.log(response.data.Wallpaper)
  } catch (error) { }
}

export async function fetchColors(
  setColors: React.Dispatch<React.SetStateAction<any[]>>,
  limit: number
) {
  try {
    const response = await axiosInstance.post(`/api/color/list`, { limit });
    setColors(response.data.color);
  } catch (error) { }
}

export async function AddColor(
  color_code: string,
  setColors: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    await axiosInstance.post(`/api/color/create`, { color_code });
    successPopup("Color created successfully");
    const response = await axiosInstance.post(`/api/color/list`);
    setColors(response.data.color);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      infoPopup("Color already exists");
    } else {
      errorPopup("Failed to create color");
    }
  }
}

export async function deleteColor(
  id: string,
  setColors: React.Dispatch<React.SetStateAction<any[]>>
) {
  // console.log(newName, `      `, id)
  await axiosInstance.delete(`/api/color/delete/${id}`);
  const response = await axiosInstance.post(`/api/color/list`);
  successPopup("Color Deleted Successfully");
  setColors(response.data.color);
}

export async function fetchBanners(
  setBanners: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const response = await axiosInstance.get(`/api/banner/list`);
    setBanners(response.data.banner);
  } catch (error) { }
}

export async function createBanner(
  name: string,
  visibility: string,
  home_page_visibility: string,
  file: File,
  setBanners: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bannerName", name);
    formData.append("visibility", visibility);
    formData.append("clicks", "0");
    formData.append("home_page_visibility", home_page_visibility);
    try {
      await axios({
        method: "post",
        url: `/api/banner/create`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      successPopup(`Banner created successfully`);
    } catch (error) {
      // console.log(error);
    }
    const response = await axiosInstance.get(`/api/banner/list`);
    setBanners(response.data.banner);
  } catch (error) { }
}

export async function fetchWallpapersWithFilter(
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  filter: string,
  pageNumber: number,
  perPage: number,
  model: string
) {
  try {
    // Check if name already exists
    const response = await axiosInstance.post(
      `/api/wallpaper/filter-wallpapers`,
      {
        sortBy: filter,
        pageNumber,
        perPage,
        model,
      }
    );
    if (response.status === 204) {
      console.log(response.status);
      setData([]);
    } else {
      setData(response.data.data);
    }
    // console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

export async function createCustomCategory(
  categoryName: string,
  wallpaperArray: Array<object>,
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    await axiosInstance.post(`/api/home/create_custom`, {
      name: categoryName,
      wallpaper_ids: wallpaperArray,
      visibility: true
    });
    successPopup("Custom Category Created Successfully");
    fetchCustomCategories(setData);
  } catch (error) {
      console.log("true")
      errorPopup(error)
      console.log(error)
  }
}

export async function fetchCustomCategories(
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const response = await axiosInstance.post(`/api/home/`);
    const customCatIndex = response.data.wallpaper.findIndex(
      (item: any) =>
        item.hasOwnProperty("customCategory") && item.customCategory.length > 0
    );
    setData(response.data.wallpaper[customCatIndex].customCategory);
    // console.log(response.data.wallpaper[customCatIndex].customCategory)
  } catch (error) { }
}

export async function updateCustomCategory(
  categoryId: string,
  wallpaperArray: Array<object>,
  visibility: boolean,
) {
  try {
    await axiosInstance.post(`/api/home/update_custom?id=${categoryId}`, {
      wallpaper_ids: wallpaperArray,
      visibility: visibility,
    });
    successPopup("Custom category updated Successfully");
  } catch (error) { }
}
export async function editCategory(
  categoryId: string,
  newName: string,
  thumbnail: File,
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    const formData = new FormData();
    formData.append("cat_name", newName);
    if (thumbnail !== null) {
      formData.append("thumbnail", thumbnail);
    }
    await axios({
      method: "post",
      url: `/api/category/update/${categoryId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    successPopup("Category Edited Successfully");
    fetchCategories(setData);
  } catch (error) { }
}

export async function fetchHexColors(
  setColors: React.Dispatch<React.SetStateAction<any[]>>,
  limit: number
) {
  try {
    const response = await axiosInstance.post(`/api/hex-color/list`, { limit });
    setColors(response.data.color);
  } catch (error) { }
}

export async function AddHexColor(
  color_code: string,
  setHexColors: React.Dispatch<React.SetStateAction<any[]>>
) {
  try {
    await axiosInstance.post(`/api/hex-color/create`, { color_hex: color_code });
    successPopup("Color created successfully");
    fetchHexColors(setHexColors, 100);
  } catch (error) { }
}

export async function deleteHexColor(
  id: string,
  setColors: React.Dispatch<React.SetStateAction<any[]>>
) {
  // console.log(newName, `      `, id)
  await axiosInstance.delete(`/api/hex-color/delete/${id}`);
  const response = await axiosInstance.post(`/api/hex-color/list`);
  successPopup("Color Deleted Successfully");
  setColors(response.data.color);
}

export async function fetchAds(
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  // console.log(newName, `      `, id)
  const response = await axiosInstance.post(`/api/add/list`);
  setData(response.data.adds);
}
export async function fetchBaseUrl(
  setData: React.Dispatch<React.SetStateAction<any[]>>
) {
  // console.log(newName, `      `, id)
  const response = await axiosInstance.post(`/api/baseurl/list`);
  setData(response.data.base_url);
}

export async function getSorting(
) {
  // console.log(newName, `      `, id)
  const response = await axiosInstance.post(`/api/sorting/list`);
  return response.data.data
}
export async function setSorting(_4d: string, _4k: string, _live: string) {
  await axiosInstance.post(`/api/sorting/`, { _4k, _4d, _live });
}
