export default function MapSearchBox(redirectBack, onConfirm) {
  return (
    <div className="address-box col-fill">
      <button className="danger btn-left" onClick={redirectBack}>
        Cancel
      </button>
      <input type="text" placeholder="Enter your address" className="col-fill"></input>
      <button className="primary btn-right" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
}