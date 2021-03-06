import { NextFunction, Request, Response, Router } from "express";
import { CustomerManager } from "../data-manager/customer.manager";
import { Api } from "../helpers";

export class CustomerController {
  public static route = "/customers";
  public router: Router = Router();
  constructor() {
    this.router.get("/", this.getCustomer);
    this.router.get("/task", this.getCustomerWithTasks);
    this.router.get("/:id", this.getCustomerById);
    this.router.post("/", this.addCustomer);
    this.router.put("/", this.updateCustomer);
    this.router.delete("/:id", this.deleteCustomer);
  }

  public async getCustomerWithTasks(request: Request, response: Response) {
    try {
      const manager = new CustomerManager();
      const result = await manager.getCustomersWithTasks();
      Api.ok(request, response, result);
    } catch (e) {
      return Api.serverError(request, response, e);
    }
  }

  public getCustomer(request: Request, response: Response, next: NextFunction) {
    let manager = new CustomerManager();
    manager.getCustomers().then(
      result => {
        return Api.ok(request, response, result);
      },
      err => {
        next(err);
      }
    );
  }

  public getCustomerById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let manager = new CustomerManager();
    console.log("customer by id ", request.params);
    let id = parseInt(request.params["id"], 0);
    manager.getCustomer(id).then(
      result => {
        return Api.ok(request, response, result[0]);
      },
      err => {
        next(err);
      }
    );
  }

  public addCustomer(request: Request, response: Response, next: NextFunction) {
    let manager = new CustomerManager();
    manager.addCustomer(request.body).then(
      result => {
        return Api.ok(request, response, result[1]);
      },
      err => {
        next(err);
      }
    );
  }

  public updateCustomer(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let manager = new CustomerManager();
    manager.updateCustomer(request.body).then(
      result => {
        return Api.ok(request, response, result[1]);
      },
      err => {
        next(err);
      }
    );
  }

  public deleteCustomer(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let manager = new CustomerManager();
    let id = parseInt(request.params["id"], 0);
    manager.deleteCustomer(id).then(
      result => {
        return Api.ok(request, response, "Ok");
      },
      err => {
        next(err);
      }
    );
  }
}
