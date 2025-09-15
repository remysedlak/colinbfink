function Portrait() {
  return (
    <div className="flex flex-col max-w-2xl items-center">
      <img
        src="/Portrait.png"
        alt="Colin B. Fink"
        className="m-8 bg-gray-200 h-100 w-100 object-cover rounded-full"
      />
      <h1 className="text-4xl italic font-bold text-center">Colin B. Fink</h1>
      <h2 className="text-2xl text-center">Writer | Director | Editor</h2>
    </div>
  );
}
export default Portrait;
