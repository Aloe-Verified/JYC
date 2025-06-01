"use client";

export const Heading = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2bg-white dark:text-amber-50">
          Your note-taker, your advisor, your friend,{" "}
          <span className="text-5xl font-black text-blue-600">JYC</span>
        </h1>
        <button className=" mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Enter
        </button>
    </div>
    )
}
