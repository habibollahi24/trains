import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Schema_FormType, formSchema } from '@/types/formSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
// import { useEffect } from 'react';
// import CreatableSelect from 'react-select/creatable';
// import Select from 'react-select/creatable';
// import MyMultiInput from '@/components/MyMultiInput';

let counter = 0;

type Heart = {
  id: number;
};

function FormForm() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      comfirm_password: '',
      // states: [],
      chom: '',
    },
  });

  // useEffect(() => {
  //   form.unregister('chom');
  //   console.log('render');
  // }, [form]);

  console.log(form.formState.errors);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const newHeart = {
      id: Date.now(),
    };
    setHearts([...hearts, newHeart]);

    const buttonRect = event.target.getBoundingClientRect();

    const buttonX = event.clientX - buttonRect.left;
    const buttonY = event.clientY - buttonRect.top;

    console.log('Button Coordinates:', { buttonX, buttonY });
    setCordinate({ x: buttonX, y: buttonY });

    setTimeout(() => {
      setHearts((hearts) => hearts.filter((heart) => heart.id !== newHeart.id));
    }, 500);
  };

  console.log(hearts);

  const onSubmit = (data: Schema_FormType) => {
    console.log('data is : ', data);
  };

  return (
    <div className="max-w-80 mx-auto mt-8">
      <h1 className="text-3xl mb-2">Form {counter++} </h1>

      {/* <button
        onAnimationEnd={() => setHeart(true)}
        className={cn('rounded-lg border-2 px-4 py-1', { ' heart': heart })}
      >
        click
      </button> */}
      <div className="heart-container  ">
        <button
          className="px-4 py-1 bg-blue-500 text-white rounded-2xl size-80"
          onMouseDown={handleClick}
          // onClick={(e)=>{}}
        >
          Click Me
        </button>
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart select-none"
            style={{ top: cordinate.y, left: cordinate.x }}
          >
            ❤
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email..."
                    {...field}
                    className="!mt-[2px]"
                  />
                </FormControl>
                <FormMessage className="!mt-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pasword</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="focus-visible:ring-offset-0 !mt-[2px]"
                  />
                </FormControl>
                <FormMessage className="!mt-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comfirm_password"
            render={({ field, formState }) => {
              return (
                <FormItem>
                  <FormLabel>comfirm Pasword</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className={cn('!mt-[2px]', {
                        'border-red-500': formState.errors.comfirm_password,
                      })}
                    />
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              );
            }}
          />

          <label htmlFor="">chom</label>
          <input
            type="text"
            className="border-2 block"
            {...form.register('chom', {
              validate: (value, formValues) => {
                console.log(value, formValues);
                return value === 'mohammad';
              },
              // required: { value: true, message: 'benevis' },
            })}
          />
          <p>{form.formState.errors.chom?.message}</p>

          {/* <FormField
            control={form.control}
            name="states"
            render={(data) => {
              return (
                <FormItem>
                  <FormLabel>states</FormLabel>
                  <FormControl>
                    <MyMultiInput<'states'>
                      field={data.field}
                      options={[
                        { value: 'esfahan', label: 'Esfahan' },
                        { value: 'tehran', label: 'Tehran' },
                      ]}
                    />
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              );
            }}
          /> */}

          {/* <FormField
            control={form.control}
            name="chom"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Chom</FormLabel>
                  <FormControl>
                    <MyMultiInput fields={field} />
                    <input {...field} className="block border-2" />
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              );
            }}
          /> */}
          <Button>submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default FormForm;
