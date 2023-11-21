import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabines could not be loaded");
  }

  return data;
}

export async function createEditCabine(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random() * 10}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //  https://mhcuwtgmyxwszrvpqgzy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //  1.Create cabin
  let query = supabase.from("cabins");
  // a) create/edit cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabines could not be created");
  }

  //  2.upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //  3.delete the cabine if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new error(
      "Cabines image could not be uploaded and cabine wasn't created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabines could not be loaded");
  }
  return data;
}
