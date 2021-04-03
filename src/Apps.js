import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Row,
    Table,
} from 'reactstrap';
import Select from 'react-select';
import { useState } from 'react';

function Apps() {
    const options = [
        { value: true, label: 'Kích Hoạt' },
        { value: false, label: 'Ẩn' },
    ];

    const options1 = [
        { value: -1, label: 'Tất Cả' },
        { value: 0, label: 'Ẩn' },
        { value: 1, label: 'Kích Hoạt' },
    ];

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <Container className="pt-3">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
            </div>
            <Row className="mt-5">
                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    {/* Form */}
                    <Card>
                        <CardHeader className="bg-warning d-flex align-items-center justify-content-between">
                            <h6>Thêm Công Việc</h6>
                            <i className="fa fa-times-circle"></i>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Tên: </Label>
                                    <Input type="text" name="name" id="name" placeholder="with a placeholder" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="status">Trạng Thái: </Label>
                                    <Select options={options} isSearchable={false} />
                                </FormGroup>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Button color="warning">
                                        <i className="fa fa-plus"></i> Lưu Lại
                                    </Button>
                                    <Button color="danger ml-3">
                                        <i className="fa fa-times"></i> Hủy Bỏ
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="8" sm="8" md="8" lg="8" xl="8">
                    <Button color="primary">
                        <i className="fa fa-plus"></i> Thêm Công Việc
                    </Button>
                    {/* Search & Sort */}
                    <Row className="mt-3">
                        {/* Search */}
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <InputGroup>
                                <Input />
                                <InputGroupAddon addonType="append">
                                    <Button className="bg-primary">
                                        <i className="fa fa-search"></i> Tìm
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col xs="6" sm="6" md="6" lg="6" xl="6">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle>
                                    Sắp Xếp <i className="far fa-caret-square-down"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <i className="fas fa-sort-alpha-down"></i> Tên A - Z
                                    </DropdownItem>
                                    <DropdownItem>
                                        <i className="fas fa-sort-alpha-down-alt"></i> Tên Z - A
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Trạng Thái Kích Hoạt</DropdownItem>
                                    <DropdownItem>Trạng Thái Ẩn</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Table bordered>
                                <thead>
                                    <tr className="text-center align-middle">
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Trạng Thái</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <Input name="filterName" />
                                        </td>
                                        <td>
                                            <Select options={options1} isSearchable={false} />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="text-center align-middle">
                                            2
                                        </th>
                                        <td className="text-left align-middle">lorem ipsum dolor</td>
                                        <td className="text-left align-middle">
                                            <Badge color="danger">Kích Hoạt</Badge>
                                        </td>
                                        <td>
                                            <div>
                                                <Button color="warning">
                                                    <i className="fas fa-pencil-alt"></i> Sửa
                                                </Button>
                                                <Button color="danger ml-3">
                                                    <i className="fa fa-trash"></i> Xóa
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Apps;
