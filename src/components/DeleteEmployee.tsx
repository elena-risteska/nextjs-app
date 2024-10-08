"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DELETE } from "@/client";

export default function DeleteEmployee(id: any) {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  let token: string;

  async function onDelete() {
    console.log("userID: " + id.id);
    token = localStorage.getItem("token") || "";

    try {
      const response: any = await DELETE("/api/users/{user_id}", {
        params: {
          header: {
            Authorization: `Bearer ${token}`,
          },
          path: {
            user_id: id.id,
          },
        },
      });

      console.log(response);

      if (response.response.status === 200) {
        router.push("/employees");
      } else {
        setError(`Error: ${response.response.statusText || "Unknown error"}`);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  }
  return (
    <>
      <button
        type="button"
        className="rounded-2xl w-full py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-red-800 hover:bg-red-700 focus:outline-none"
        onClick={() => setModal(true)}
      >
        Delete employee
      </button>
      {modal ? (
        <>
          <div
            onClick={() => setModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="my-auto w-fit outline-none focus:outline-none"
            >
              <div className="items-center h-fit w-fit">
                <div className="flex items-center md:p-8 p-6 bg-white rounded-3xl h-full">
                  <div className="max-w-fit w-full mx-auto">
                    <div className="mb-12">
                      <h1 className="text-stone-950 text-center text-3xl font-bold">
                        Are you sure you want to <br></br>
                        delete this employee?
                      </h1>
                    </div>
                    <div className="mt-8">
                      <button
                        type="button"
                        className="rounded-2xl w-fit float-left py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-stone-800 hover:bg-stone-700 focus:outline-none"
                        onClick={() => {
                          setModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onDelete}
                        type="submit"
                        className="rounded-2xl w-2/4 float-right py-3 px-6 cursor-pointer text-sm font-semibold tracking-wider text-white bg-red-800 hover:bg-red-700 focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {error && alert({ error })}
    </>
  );
}
