import { ChangeDetectionStrategy, Component, inject, input, type InputSignal }                                  from "@angular/core";
import { UserCredential }                                                                                       from "@angular/fire/auth";
import { doc, type DocumentReference, Firestore, setDoc }                                                       from "@angular/fire/firestore";
import { type AbstractControl, FormControl, FormGroup, ReactiveFormsModule, type ValidationErrors, Validators } from "@angular/forms";
import { type AccountDocument, type StripeCustomerDocument }                                                    from "@standard/interfaces";
import { AuthenticationService }                                                                                from "@standard/services";
import { CaptionComponent, HeaderComponent, LabelComponent, SymbolComponent }                                   from "../content";
import { DividerComponent, FlexboxContainerComponent, ListComponent, SectionComponent }                         from "../layout and organization";
import { ButtonComponent, LinkComponent }                                                                       from "../menus and actions";
import { type SheetComponent }                                                                                  from "../presentation";
import { FormComponent, TextFieldInputComponent }                                                               from "../selection and input";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ButtonComponent,
      CaptionComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      LabelComponent,
      LinkComponent,
      ListComponent,
      ReactiveFormsModule,
      SectionComponent,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    selector:        "standard--signup",
    styleUrl:        "SignupComponent.sass",
    templateUrl:     "SignupComponent.html",

    standalone: true,
  },
)
export class SignupComponent {

  private readonly firestore: Firestore = inject<Firestore>(Firestore);

  protected readonly authenticationService: AuthenticationService                                                                                                           = inject<AuthenticationService>(AuthenticationService);
  protected readonly signupWithPasskeyFormGroup: FormGroup<{ "email": FormControl<string> }>                                                                                = new FormGroup<{ "email": FormControl<string> }>(
    {
      email: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
    },
  );
  protected readonly signupWithPasswordFormGroup: FormGroup<{ "email": FormControl<string>, "password": FormControl<string>, "passwordConfirmation": FormControl<string> }> = new FormGroup<{ "email": FormControl<string>, "password": FormControl<string>, "passwordConfirmation": FormControl<string> }>(
    {
      email:                new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      password:             new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
      passwordConfirmation: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
    },
    {
      validators: [
        ({ value }: AbstractControl): ValidationErrors => value.password !== value.passwordConfirmation ? {
          "passwordConfirmationMatches": true,
        } : {},
      ],
    },
  );

  public readonly sheetComponentInput$: InputSignal<SheetComponent> = input.required<SheetComponent>(
    {
      alias: "sheetComponent",
    },
  );

  private async setUserDocuments(
    userId: string,
    email: string,
    security: Exclude<AccountDocument["security"], undefined>,
  ): Promise<void> {
    return setDoc<AccountDocument, AccountDocument>(
      doc(
        this.firestore,
        `/accounts/${ userId }`,
      ) as DocumentReference<AccountDocument, AccountDocument>,
      {
        email,
        security,
      },
      {
        merge: true,
      },
    ).then<void, never>(
      (): Promise<void> => setDoc<StripeCustomerDocument, StripeCustomerDocument>(
        doc(
          this.firestore,
          `/stripeCustomers/${ userId }`,
        ) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>,
        {},
        {
          merge: true,
        },
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      ),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );
  }

  protected async signupWithPasswordFormSubmit(openModel$: SheetComponent["openModel$"]): Promise<void> {
    const email: string | undefined    = this.signupWithPasswordFormGroup.value.email;
    const password: string | undefined = this.signupWithPasswordFormGroup.value.password;

    if (email && password)
      return this.authenticationService.createUserWithEmailAndPassword(
        email,
        password,
      ).then<void, never>(
        ({ user }: UserCredential): Promise<void> => this.setUserDocuments(
          user.uid,
          email,
          {
            password: true,
          },
        ).then<void, never>(
          (): void => {
            openModel$.set(false);

            setTimeout(
              (): void => this.signupWithPasswordFormGroup.reset(),
              180,
            );
          },
          (error: unknown): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected async signupWithPasskeyFormSubmit(openModel$: SheetComponent["openModel$"]): Promise<void> {
    const email: string | undefined = this.signupWithPasskeyFormGroup.value.email;

    if (email)
      return this.authenticationService.createUserWithPasskey(email).then<void, never>(
        ({ user }: UserCredential): Promise<void> => this.setUserDocuments(
          user.uid,
          email,
          {
            passkey: true,
          },
        ).then<void, never>(
          (): void => {
            openModel$.set(false);

            setTimeout(
              (): void => this.signupWithPasskeyFormGroup.reset(),
              180,
            );
          },
          (error: unknown): never => {
            console.error("Something went wrong.");

            throw error;
          },
        ),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }

}
