const getAllItems = (req, res) => {
    res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
};

module.exports = {getAllItems}