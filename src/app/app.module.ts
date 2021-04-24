import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';

//Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { StudentService } from './services/student/student.service';
import { CustomerService } from './services/customer/customer.service'
import { AuthTokenInterceptor } from './interceptor/token.interceptor';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { PhonePipe } from './pipes/phone.pipe';

// Components
import { AppComponent } from './components/index/app.component';
import { StudentListComponent } from './components/student/list/student-list.component';
import { StudentDetailsComponent } from './components/student/details/student-details.component';
import { StudentAddComponent } from './components/student/add/student-add.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { HighlightStudentDirective } from './directives/highlight-student.directive';
import { DatePipe } from './pipes/date.pipe';



// Parent Routes
const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: homeChildRoutes,
		canActivate: [AuthService]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	declarations: [
		AppComponent,
		StudentListComponent,
		StudentDetailsComponent,
		StudentAddComponent,
		LoginComponent,
		HomeComponent,
		FilterPipe,
		PhonePipe,
		HighlightStudentDirective,
		DatePipe
	],
	imports: [
		BrowserModule,
		RouterModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		NgxPaginationModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthTokenInterceptor,
			multi: true
		},
		AuthService,
		UserService,
		StudentService,
		CustomerService
	],
	bootstrap: [AppComponent]
})

// enableProdMode();

export class AppModule { }
