import React from "react";
import type { Place } from "../../types";

export function withNewBadge<T extends { place: Place }>(Wrapped: React.ComponentType<T>) {
  return function Decorated(props: T) {
    return (
      <div className="position-relative">
        {props.place.is_new ? (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">NUEVO</span>
        ) : null}
        <Wrapped {...props} />
      </div>
    );
  };
}
