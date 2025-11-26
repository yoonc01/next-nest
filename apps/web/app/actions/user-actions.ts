"use server";

export async function searchUsers(name: string) {
  const DB = [
    { id: 1, name: "hyoyoon1" },
    { id: 2, name: "hyoyoon2" },
    { id: 3, name: "hyoyoon3" },
  ];

  return DB.filter(user => user.name.includes(name));
}
