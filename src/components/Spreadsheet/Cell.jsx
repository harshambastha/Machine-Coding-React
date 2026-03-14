const TableHeader = ({className, header, ...props}) => (
    <th className={className} {...props}>{header}</th>
)

const TableInput = ({className, ...props}) => (
    <input
        type="text"
        className={className}
        {...props}
    />)

export { TableHeader, TableInput }