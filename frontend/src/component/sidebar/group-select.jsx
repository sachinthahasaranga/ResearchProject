
import PriceSelect from "./price-select";
import SelectLanguage from "./select-language";
import SelectCatagory from "./selectCatagory";
import SkillSelect from "./skill-select";



const GroupSelect = () => {
    return (
        <div className="group-select-section">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row align-items-center g-4">
                        <div className="col-md-1">
                            <div className="group-select-left">
                                <i className="icofont-abacus-alt"></i>
                                <span>Filters</span>
                            </div>
                        </div>
                        <div className="col-md-11">
                            <div className="group-select-right">
                                <div className="row g-2 row-cols-lg-4 row-cols-sm-2 row-cols-1">
                                    <div className="col">
                                        <div className="select-item">
                                            <SelectCatagory select={'all'} />
                                            <div className="select-icon">
                                                <i className="icofont-rounded-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="select-item">
                                            <SelectLanguage select={'all'} />
                                            <div className="select-icon">
                                                <i className="icofont-rounded-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="select-item">
                                            <PriceSelect select={'all'} />
                                            <div className="select-icon">
                                                <i className="icofont-rounded-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="select-item">
                                            <SkillSelect select={'all'} />
                                            <div className="select-icon">
                                                <i className="icofont-rounded-down"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default GroupSelect;