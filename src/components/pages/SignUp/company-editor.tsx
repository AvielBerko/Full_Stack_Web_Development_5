import { Company } from "../../../lib/data/dataObjects/User";
import { StateSetter } from "../../../types/react.types";
import MultiInputGroup,{InputItem} from "../../common/MultiInputGroup/multi-input-group";


type CompanyEditorProps = {
  setCompany: StateSetter<Company>;
  value: Company;
};



export default function CompanyEditor({ setCompany,value }: CompanyEditorProps) {
    const items:InputItem[] = [
        {placeholder:"name",propName:"name"},
        {placeholder:"catch phrase",propName:"catchPhrase"},
        {placeholder:"bs",propName:"bs"}
    ]

  return <MultiInputGroup setter={setCompany} items={items} label="Company" obj={value} />;
}
