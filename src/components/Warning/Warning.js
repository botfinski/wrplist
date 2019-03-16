import React from "react";
import Button from "../Button/Button";
import "./Warning.scss";
import Controls from "../Controls/Controls";

const warning = props => {
  if (props.showWarning) {
    return (
      <div className={props.showWarning ? "Warning visible" : "Warning"}>
        <div className="Warning-Content">
          <p>
            Are you sure you want to delete
            {props.list
              .filter(item => item.id === props.selectedItemId)
              .map((item, index) => {
                return (
                  <strong key={item + index}>
                    {" "}
                    {item.category} {item.title}
                  </strong>
                );
              })}
            ?
          </p>
        </div>

        <Controls>
          <Button name="Close" className="Cancel" clicked={props.closeWarningClicked} />
          <Button name="Confirm" className="Save-Item" clicked={props.confirmWarningClicked} />
        </Controls>
      </div>
    );
  } else {
    return null;
  }
};

export default warning;
