import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider} from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "us-east-1"
    })


    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-0889a44b331db0194",
      instanceType: "t2.micro"
    });

    new TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp
    });
  }
}

const app = new App();
new MyStack(app, "terraform-cdktf-typescript");
app.synth();
