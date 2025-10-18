import { CreateBusinessCase } from "../../application/business_case/create_business";
import { BusinessRepository } from "../../interface/repositories/business_repo/business_repo";

const newBusinessRepository =  new BusinessRepository;
const businessCaseInjection = new CreateBusinessCase(newBusinessRepository);

export { businessCaseInjection };