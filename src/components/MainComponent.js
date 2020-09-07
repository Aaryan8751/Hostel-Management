import React, { Component } from 'react';
import Header from './Header';
import Bar from './NavComponent';
import Footer from './Footer';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Admin from './AdminMainComponent';
import Contact from './ContactComponent';
import Student from './StudentMainComponent';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { postArchitecture, postComplaint, postEmployee, postMeal, postMealbill, postNotice, postSalary, 
    postSeatallocation, postStudent, fetchArchitecture, fetchComplaints, fetchEmployees, fetchMealbill, 
    fetchMeals, fetchNotices, fetchSalaries, fetchSeatallocation, fetchStudents, deleteComplaint, 
    deleteEmployee, deleteNotice, deleteSalary, deleteStudent, logoutUser, loginUser } from '../redux/actionCreators';


const mapDispatchToProps = (dispatch) => ({
    postArchitecture: (architecture) => dispatch(postArchitecture(architecture)),
    postComplaint: (complaint) => dispatch(postComplaint(complaint)), 
    postEmployee: (employee) => dispatch(postEmployee(employee)), 
    postMeal: (meal) => dispatch(postMeal(meal)), 
    postMealbill: (mealBill) => dispatch(postMealbill(mealBill)), 
    postNotice: (notice) => dispatch(postNotice(notice)), 
    postSalary: (salary) => dispatch(postSalary(salary)), 
    postSeatallocation: (seat) => dispatch(postSeatallocation(seat)), 
    postStudent: (notice) => dispatch(postStudent(notice)), 
    fetchArchitecture: () => dispatch(fetchArchitecture()), 
    fetchComplaints: () => dispatch(fetchComplaints()), 
    fetchEmployees: () => dispatch(fetchEmployees()), 
    fetchMealbill: () => dispatch(fetchMealbill()), 
    fetchMeals: () => dispatch(fetchMeals()), 
    fetchNotices: () => dispatch(fetchNotices()), 
    fetchSalaries: () => dispatch(fetchSalaries()), 
    fetchSeatallocation: () => dispatch(fetchSeatallocation()), 
    fetchStudents: () => dispatch(fetchStudents()), 
    deleteComplaint: (complaintId) => dispatch(deleteComplaint(complaintId)), 
    deleteEmployee: (employeeId) => dispatch(deleteEmployee(employeeId)), 
    deleteNotice: (noticeId) => dispatch(deleteNotice(noticeId)), 
    deleteSalary: (salaryId) => dispatch(deleteSalary(salaryId)), 
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
})

const mapStateToProps = (state) => {
    return {
        students: state.students,
        notices: state.notices,
        meals: state.meals,
        employees: state.employees,
        mealBills: state.mealBills,
        salaries: state.salaries,
        architecture: state.architecture,
        seatAllocation: state.seatAllocation,
        complaints: state.complaints,
        auth: state.auth,
    }
}

class Main extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       if(this.props.auth.isAuthenticated) {
        this.props.fetchEmployees();
        this.props.fetchStudents();
        this.props.fetchArchitecture();
        this.props.fetchSalaries();
        this.props.fetchComplaints();
        this.props.fetchNotices();
        this.props.fetchSeatallocation();
        this.props.fetchMeals();
        this.props.fetchMealbill();
       }
    }

    render() {
        const AdminRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated && this.props.auth.admin
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );

        const StudentRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated && !this.props.auth.admin
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/home',
                    state: { from: props.location }
                  }} />
            )} />
        );


        return (
            <div>
                <div className="container-fluid topSection">
                    <Header />
                    <Bar auth={this.props.auth} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} />
                </div>
    
                    <div className="mainSection">
                    <Switch>
                        <Route path="/home" component={() => <Home/>}/>
                        <Route path="/login" component={() => <LoginForm auth={this.props.auth} loginUser={this.props.loginUser} />}/>
                        <AdminRoute path="/admin" component={() => <Admin auth={this.props.auth} postNotice={this.props.postNotice}
                        employees={this.props.employees} notices={this.props.notices} students={this.props.students} postStudent={this.props.postStudent} 
                        deleteStudent = {this.props.deleteStudent} fetchStudents={this.props.fetchStudents} salaries={this.props.salaries} complaints = {this.props.complaints} postEmployee={this.props.postEmployee}
                        meals={this.props.meals} mealBills={this.props.mealBills} fetchEmployees={this.props.fetchEmployees} seatAllocation={this.props.seatAllocation} architecture={this.props.architecture}/>}/>
                        <Route path="/contactus" component={Contact}/>
                        <StudentRoute path="/student" component={() => <Student auth={this.props.auth} 
                        employees={this.props.employees} notices={this.props.notices} students={this.props.students} salaries={this.props.salaries}
                        meals={this.props.meals} mealBills={this.props.mealBills} seatAllocation={this.props.seatAllocation} architecture={this.props.architecture}/>}/>
                        <Redirect to="/home"/>
                    </Switch>
                    </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));;
