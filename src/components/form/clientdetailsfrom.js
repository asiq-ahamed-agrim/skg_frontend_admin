import "../style/form/clientform.scss";
import { useDispatch, useSelector } from "react-redux";
import { clientaddstate } from "../redux/reducer/counterslice";
import { useEffect, useState, useMemo } from "react";

const ClientDetailsForm = () => {
  const [clientdata, setclientdata] = useState({
    details: [
      {
        store_name: "",
        phonenumber: "",
        address: "",
      },
    ],
  });

  const clientstate = useSelector((state) => state.counter.clientaddstatevalue);
  const dispatch = useDispatch();

  const addItemToList = () => {
    setclientdata((prev) => {
      return {
        ...prev,
        details: [
          ...clientdata.details,
          {
            store_name: "",
            phonenumber: "",
            address: "",
          },
        ],
      };
    });
  };

  const removeItemFromList = (index) => {
    console.log(index, clientdata);

    let l1 = [];
    for (let i = 0; i < clientdata.details.length; i++) {
      if (index != i) {
        l1.push(clientdata.details[i]);
      }
    }
    setclientdata((prev) => {
      return {
        ...prev,
        details: l1,
      };
    });
  };

  const changedata = (e, index) => {
    console.log(e.target.name);
    let l1 = [];
    for (let i = 0; i < clientdata.details.length; i++) {
      if (index == i) {
        clientdata.details[i][e.target.name] = e.target.value;
        l1.push(clientdata.details[i]);
      } else {
        l1.push(clientdata.details[i]);
      }
    }
    setclientdata((prev) => {
      return {
        ...prev,
        details: l1,
      };
    });
  };
  return (
    <>
      <div className="maincontainer">
        <div className="parent-Clientform">
          <div className="create-Clientform card">
            <div class="modal-header">
              <h5 class="modal-title">{clientstate}</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  dispatch(clientaddstate(""));
                }}
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body" style={{ padding: "0 !important" }}>
              <div class="container p-2">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <form name="add_name" id="add_name">
                        <div className="form_parent">
                        {clientdata.details.map((ele, index) => {
                          return (
                            <div className="row mb-2">
                              <div className="col-3">
                                <input
                                  type="text"
                                  name="store_name"
                                  className="form-control"
                                  placeholder="Enter your Name"
                                  class="form-control name_list"
                                  value={ele.store_name}
                                  onChange={(e) => changedata(e, index)}
                                />
                              </div>
                              <div className="col-3">
                                <input
                                  type="text"
                                  name="phonenumber"
                                  className="form-control"
                                  placeholder="Enter your Email"
                                  class="form-control name_email"
                                  value={ele.phonenumber}
                                  onChange={(e) => changedata(e, index)}
                                />
                              </div>
                              <div className="col-4">
                                <textarea
                                  type="text"
                                  name="address"
                                  placeholder="Enter your Money"
                                  class="form-control total_amount"
                                  value={ele.address}
                                  onChange={(e) => changedata(e, index)}
                                />
                              </div>

                              {index == 0 && (
                                <div className="col-2">
                                  <button
                                    type="button"
                                    name="add"
                                    id="add"
                                    class="btn btn-primary"
                                    onClick={() => addItemToList()}
                                    disabled={index > 5 ? true : false}
                                  >
                                    Add More
                                  </button>
                                </div>
                              )}
                              {index != 0 && (
                                <div className="col-2">
                                  <button
                                    type="button"
                                    name="add"
                                    id="add"
                                    class="btn btn-primary"
                                    onClick={() => removeItemFromList(index)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                        </div>
                        <input
                          type="submit"
                          class="btn btn-success"
                          name="submit"
                          id="submit"
                          value="Submit"
                        ></input>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetailsForm;
