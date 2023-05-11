import { ChangeEvent, useCallback, useId } from "react";
import { useSelector, useDispatch } from "../ts/hooks/redux";
import { setTax } from "../ts/reducers/sharedSlice/sharedSlice";
import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import type { FC } from "react";

const Summary: FC = () => {
  const dispatch = useDispatch();

  const taxInputId = useId();
  const tax = useSelector(state => state.shared.tax);
  const persons = useSelector(state => state.persons);
  const availableItems = useSelector(state => state.items);
  const changeTax = (tax: number) => dispatch(setTax(tax));

  const subTotal = useCallback(
    () =>
      Object.values(persons).reduce(
        (acc, { items }) =>
          Object.entries(items).reduce(
            (acc, [id, amount]) => acc + availableItems[id].price * amount,
            0
          ) + acc,
        0
      ),
    [persons, availableItems]
  );

  const taxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    changeTax(value / 100);
  };

  const total = subTotal() * (1 + tax);

  return (
    <Card>
      <CardHeader title="Summary" />
      <CardContent>
        <h3>Sub-total: {subTotal()}</h3>
      </CardContent>
      <CardContent>
        <TextField
          id={taxInputId}
          label="Tax"
          placeholder="e.g. 14%"
          onChange={taxChangeHandler}
        />
      </CardContent>
      <CardContent>
        <h3>Total: {total.toFixed(2)}</h3>
      </CardContent>
    </Card>
  );
};

export default Summary;
