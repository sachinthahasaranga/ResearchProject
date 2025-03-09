



const SkillSelect = ({select}) => {
    return (
        <select defaultValue={select}>
            <option value="all">All Skills</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="php">PHP</option>
            <option value="java">JAVA</option>
            <option value="javascript">JAVASCRIPT</option>
            <option value="wordpress">WORDPRESS</option>
            <option value="react">REACT</option>
            <option value="vue">VUE</option>
            <option value="angular">ANGULAR</option>
        </select>
    );
}
 
export default SkillSelect;