import { Address } from "../../../lib/data/dataObjects/User";
import { StateSetter } from "../../../types/react.types";
import MultiInputGroup, {
  InputItem,
} from "../../common/MultiInputGroup/multi-input-group";

type AddressEditorProps = {
  setAddress: StateSetter<Address>;
  value: Address;
};

export default function AddressEditor({
  setAddress,
  value,
}: AddressEditorProps) {
  const items: InputItem[] = [
    { placeholder: "city", propName: "city" },
    { placeholder: "street", propName: "street" },
    { placeholder: "suite", propName: "suite" },
    { placeholder: "zipcode", propName: "zipcode" },
  ];

  return (
    <MultiInputGroup
      setter={setAddress}
      items={items}
      label="Address"
      obj={value}
    />
  );
}
